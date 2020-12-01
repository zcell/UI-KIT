<script>
    export default {
        name: 'DefaultHeading',

        props: {
            title: {
                type: String,
                required: true,
            },

            cacheParams: {
                type: Object,
                default: null,
                validator(value) {
                    return (
                        ((value.hasOwnProperty('url') && typeof value.url === 'string') || value.hasOwnProperty('url') === false) &&
                        ((value.hasOwnProperty('headers') && value.headers.toString() === '[object Object]') ||
                            value.hasOwnProperty('headers') === false)
                    );
                },
            },

            clientUrl: {
                type: String,
                default: '',
            },
        },

        methods: {
            async clearCache() {
                if (this.cacheParams?.url) {
                    await fetch(this.cacheParams.url, { method: 'delete', headers: this.cacheParams.headers })
                        .then(resp => {
                            if (resp.status === 200) {
                                this.$emit('cacheClearedSuccess');
                            } else {
                                this.$emit('cacheClearedError');
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.$emit('cacheClearedError');
                        });
                }
            },

            async logout() {
                this.$emit('logout');
            },
        },

        render() {
            return (
                <div class="defaultHeading">
                    <h1 class="defaultHeading__h1 h1">{this.title}</h1>

                    <div class={`defaultHeading__headBox`}>
                        {this.$slots.heading && <div class="defaultHeading__headSlotItems">{this.$slots.heading}</div>}

                        <div class="defaultHeading__buttonsWrapper">
                            {this.cacheParams?.url && (
                                <button
                                    type="button"
                                    class="defaultHeading__btn editBtn--headingBtn"
                                    title="Очистить кэш"
                                    onClick={() => this.clearCache()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="defaultHeading__btnIcon">
                                        <path d="M.49 14.88l.9-.52c0-.1-.65-2.1 1.2-3.16 1.26-.73 2.9-.3 3.63.96.73 1.27.3 2.9-.96 3.63-1.73 1-3.1-.35-3.4-.49l-.9.52.45.48A5.32 5.32 0 005.25 18 5.24 5.24 0 009 16.47 5.24 5.24 0 0012.7 18a5.32 5.32 0 003.89-1.7l.4-.51-.9-.52-.29.24a2.7 2.7 0 01-3.06.28 2.67 2.67 0 01-.96-3.63 2.68 2.68 0 013.63-.96 2.68 2.68 0 011.27 2.8l-.01.39.9.52.19-.67a5.23 5.23 0 00-2.4-6.12 5.24 5.24 0 00-1.58-.58c.32-.7.5-1.49.5-2.27a5.23 5.23 0 00-4.1-5.13L9.52.06V1.1l.35.12a2.62 2.62 0 011.76 2.47c0 1.45-1.19 2.67-2.64 2.67S6.36 5.14 6.36 3.7c0-1.12.71-2.1 1.76-2.47l.35-.19V0l-.64.15a5.23 5.23 0 00-4.1 5.12c0 .78.17 1.58.5 2.27a5.24 5.24 0 00-1.59.58 5.28 5.28 0 00-2.4 6.16l.25.6zM9 8.48a1.58 1.58 0 110 3.16 1.58 1.58 0 010-3.17z" />
                                    </svg>
                                </button>
                            )}

                            {this.clientUrl && (
                                <a
                                    class="defaultHeading__btn editBtn--headingBtn"
                                    title="Перейти на сайт"
                                    href={this.clientUrl}
                                    rel="nofollow"
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="defaultHeading__btnIcon">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.9 16.3l-.6-1.1-.4-.5c-.3-.7-.2-1 .4-2l.1-.2c.5-.9.6-1.7.6-2.4V9c.2-.8 1.8-1 2.7-1 .2.6.3 1.2.3 1.9a8 8 0 01-3.1 6.3M10 2a8 8 0 011.8.2c-.2.4-.4.7-.8 1l-.7.4c-.6.4-1.4.9-1.8 1.7-.7 1.2-.7 2.3-.7 3.3 0 1.4 0 2.2-1 2.9-1.3 1-3.4.5-4.7 0A8 8 0 012 10a8 8 0 018-8m0-2a10 10 0 100 20 10 10 0 000-20"
                                        />
                                    </svg>
                                </a>
                            )}

                            <a
                                class="defaultHeading__btn editBtn--headingBtn"
                                title="Инструкция"
                                href="https://docs.google.com/document/d/1CNDmxxa-59Wt28HwxGoKsBvsekQyDsKBECilMhY8frI/edit"
                                rel="nofollow"
                                target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="defaultHeading__btnIcon">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10 20a10 10 0 100-20 10 10 0 000 20zm.2-8.7h-1L9 9.4c1.6-.1 2.3-.6 2.3-1.4 0-.7-.5-1.2-1.4-1.2-.8 0-1.4.4-2 1l-.9-1c.7-.8 1.6-1.3 3-1.3 1.6 0 2.7 1 2.7 2.5s-1 2.1-2.4 2.4v1zm.3 2.7H8.9v-1.6h1.6V14z"
                                    />
                                </svg>
                            </a>

                            <button type="button" class="defaultHeading__btn editBtn--headingBtn" title="Выйти" onClick={() => this.logout()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="defaultHeading__btnIcon">
                                    <path d="M20 8.8a.8.8 0 00-.2-.2L17.3 6A.8.8 0 0016 7.3l1 1h-4.6a.8.8 0 100 1.7h4.7L16 11a.8.8 0 101.2 1.3l2.5-2.5a.8.8 0 00.1-1z" />
                                    <path d="M14.2 11.7a.8.8 0 00-.9.8v4.2H10V3.3a.8.8 0 00-.6-.8l-2.9-.8h6.8v4.1a.8.8 0 101.7 0v-5a.8.8 0 00-.8-.8H.8a.8.8 0 00-.4.1.8.8 0 00-.3.3V.7L0 .9v16.7c0 .4.3.7.7.8L9 20a.8.8 0 001-.8v-.9h4.2c.4 0 .8-.3.8-.8v-5a.8.8 0 00-.8-.8z" />
                                </svg>
                            </button>

                            {this.$slots.buttonsWrapper}
                        </div>
                    </div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .defaultHeading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        &__h1 {
            margin: 0;
            padding: 0;
        }

        &__headBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: auto;
            padding-left: 30px;

            &--flexEnd {
                justify-content: flex-end;
            }
        }

        &__headSlotItems {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-left: auto;
            padding-left: 30px;
        }

        &__buttonsWrapper {
            position: fixed;
            right: 0;
            top: 50%;

            display: flex;
            flex-direction: column;
            padding: 10px;
            z-index: 100;

            background-color: $white;
            border: 1px solid $gray;
            border-right: none;
            border-radius: 2px 0 0 2px;
            transform: translateY(-50%);

            .defaultHeading__btn {
                margin-top: 12px;
                margin-left: 0;
            }
        }

        &__btn {
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin-left: 20px;

            background: none;
            border: 1px solid $gray;
            border-radius: 2px;
            color: $additionalText;
            outline: none;

            transition: border 0.1s ease;

            &:first-child {
                margin-top: 0;
                margin-left: 0;
            }

            &:hover {
                border-color: currentColor;
                color: $mainGreen;

                cursor: pointer;
            }
        }

        &__btnIcon {
            width: 20px;
            height: 20px;

            color: inherit;
            fill: currentColor;

            transition: color 0.1s ease;
        }
    }
</style>
