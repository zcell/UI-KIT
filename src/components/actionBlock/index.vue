<script>
    import Btn from '../btn/btn';

    export default {
        name: 'ActionBlock',

        components: {
            Btn,
        },

        props: {
            arrayParams: {
                type: Array,
                required: true,
                //      url: 'sale/coupons',
                //      data: this.mapDataToApi(),
                //      method: 'put' || 'post'
                //      headers: {},
                //      order: 0,
                default() {
                    return [];
                },
                validator(value) {
                    return Array.isArray(value);
                },
            },

            isCancelButtonNeed: {
                type: Boolean,
                default: true,
            },

            cancelButtonText: {
                type: String,
                default: 'Назад',
            },

            successButtonText: {
                type: String,
                default: 'Сохранить',
            },

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            async save() {
                const resultArray = [];

                this.arrayParams.forEach(params => {
                    params.order = isNaN(params.order) ? 0 : parseInt(params.order);

                    if (Array.isArray(resultArray[params.order]) === false) {
                        resultArray[params.order] = [];
                    }

                    resultArray[params.order].push(params);
                });

                const fetchMethod = params => {
                    if (Object.keys(params?.data || {}).length > 0 && params?.url && params?.method) {
                        return fetch(params.url, {
                            method: params.method.toLowerCase() === 'put' ? 'PUT' : 'POST',
                            body: JSON.stringify(params.data),
                            headers: {
                                'content-type': 'application/json;charset=UTF-8',
                                accept: 'application/json, text/plain, */*',
                                ...params.headers,
                            },
                        });
                    }
                };

                for (const group of resultArray) {
                    const Promises = [];
                    let isError = false;

                    group.forEach(params => {
                        Promises.push(fetchMethod(params));
                    });

                    await Promise.all(Promises)
                        .then(responses => {
                            responses.forEach(async res => {
                                if (res.status === 200) {
                                    this.$emit('success', await res.json());
                                } else {
                                    isError = true;
                                    this.$emit('error', await res);
                                    console.log(await res);
                                }
                            });
                        })
                        .catch(error => {
                            isError = true;
                            this.$emit('error', error);
                            console.log(error);
                        });

                    if (isError) {
                        break;
                    }
                }
            },
        },

        render() {
            return (
                <div class={`actionBlock ${this.disabled ? 'actionBlock--disabled' : ''}`}>
                    <btn class="actionBlock__btn" type="success" onClick={() => this.save()}>
                        {this.successButtonText}
                    </btn>

                    {this.isCancelButtonNeed && (
                        <div class="actionBlock__cancelButtons">
                            <btn class="actionBlock__btn" type="danger" onClick={() => this.$emit('cancel')}>
                                {this.cancelButtonText}
                            </btn>
                        </div>
                    )}

                    {this.$slots.default}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .actionBlock {
        @import '../../assets/reset';

        z-index: 5;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 30px;
        box-sizing: border-box;

        border: 1px solid $gray;
        border-radius: 2px 2px 0 0;
        background: #fff;

        @include below($md-desktop) {
            padding: 0 15px;
        }

        &--disabled > * {
            pointer-events: none;
            filter: grayscale(0.3);
            opacity: 0.4;
            user-select: none;
        }

        &__btn {
            margin-right: 20px;
        }

        &__cancelButtons {
            display: flex;
            align-items: center;
        }
    }
</style>
