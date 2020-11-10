<script>
    import Btn from '../btn/btn';

    export default {
        name: 'ActionBlock',

        components: {
            Btn,
        },

        props: {
            params: {
                type: Object,
                required: true,
                //      url: 'sale/coupons',
                //      data: this.mapDataToApi(),
                //      method: 'put' || 'post'
                //      headers: {}
                default() {
                    return {};
                },
                validator(value) {
                    return (
                        value.hasOwnProperty('url') &&
                        typeof value.url === 'string' &&
                        value.hasOwnProperty('data') &&
                        typeof value.data === 'object' &&
                        value.hasOwnProperty('headers') &&
                        typeof value.headers === 'object' &&
                        ['put', 'PUT', 'post', 'POST'].includes(value.method)
                    );
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

            error: {},

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            async save() {
                if (Object.keys(this.params?.data || {}).length > 0 && this.params?.url && this.params?.method) {
                    const data = await fetch(this.params.url, {
                        method: this.params.method.toLowerCase() === 'put' ? 'PUT' : 'POST',
                        body: JSON.stringify(this.params.data),
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            accept: 'application/json, text/plain, */*',
                            ...this.params.headers,
                        },
                    });

                    const result = await data.json();
                    data.status === 200 ? this.$emit('success', result) : this.$emit('error', result);
                }
            },
        },

        render() {
            return (
                <div class={`actionBlock ${this.disabled && 'actionBlock--disabled'}`}>
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
        z-index: 5;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 30px;

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
