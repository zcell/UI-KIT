<script>
    export default {
        name: 'MainNav',

        props: {
            items: {
                type: Array,
                // required: true,
            },
        },

        mounted() {
            if (process.browser) {
                if ('onwheel' in document) {
                    // IE9+, FF17+, Ch31+
                    addEventListener('wheel', this.scrollWatcher);
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    addEventListener('mousewheel', this.scrollWatcher);
                }
            }
        },

        data() {
            return {
                translate: 0,
                lastScrollTop: 0,
            };
        },

        computed: {
            getTranslateValue() {
                return `transform: translateY(${this.translate}px); transition: transform .3s ease-in-out;`;
            },
        },

        methods: {
            scrollWatcher() {
                const clientHeight = document.documentElement.clientHeight;
                const pageYOffset = window.pageYOffset;
                const mainNavWrapper = document.querySelector('.mainNav__wrapper');
                const bodyHeight = document.querySelector('body').getBoundingClientRect().height;

                if (mainNavWrapper && typeof bodyHeight === 'number' && typeof clientHeight === 'number' && typeof pageYOffset === 'number') {
                    const pageScrollPercentValue = (pageYOffset * 100) / (bodyHeight - clientHeight);
                    const wrapperBottom = mainNavWrapper.getBoundingClientRect().bottom;
                    const extraNavHeight = clientHeight - mainNavWrapper.getBoundingClientRect().height;
                    if (wrapperBottom) {
                        const contentHeight = document.querySelector('.wrapper__content').getBoundingClientRect().height;
                        if (typeof contentHeight === 'number' && contentHeight <= clientHeight) {
                            mainNavWrapper.style.position = 'unset';
                        } else {
                            mainNavWrapper.style.position = '';
                            if (pageYOffset === 0 || this.lastScrollTop > pageYOffset) {
                                this.translate = 0;
                            } else if (
                                this.lastScrollTop < pageYOffset &&
                                wrapperBottom > clientHeight &&
                                pageYOffset !== bodyHeight - clientHeight
                            ) {
                                let translateValue = ((extraNavHeight * pageScrollPercentValue) / 100) * 3;
                                if (translateValue < extraNavHeight) {
                                    translateValue = extraNavHeight;
                                }
                                this.translate = translateValue;
                            }
                            // else if (pageYOffset === bodyHeight - clientHeight) {
                            //     console.log(123)
                            //     this.translate = extraNavHeight;
                            // }
                        }

                        this.lastScrollTop = pageYOffset;
                    }
                }
            },
        },

        render() {
            return (
                <div class="mainNav">
                    <div class="mainNav__wrapper" style={this.getTranslateValue}>
                        <router-link class="mainNav__home" to={{ path: '' }}>
                            <span class="mainNav__logo">{this.$slots.logo ? this.$slots.logo : 'Logo'}</span>
                        </router-link>

                        <ul class="mainNav__list">
                            {this.items &&
                                this.items.map(item => {
                                    return (
                                        <li class="mainNav__listItem">
                                            <router-link class="mainNav__link" to={item.to}>
                                                {item.icon && <span class="mainNav__icon" domPropsInnerHTML={item.icon} />}
                                                {item.text}
                                            </router-link>
                                        </li>
                                    );
                                })}
                        </ul>

                        {this.$slots.default}
                    </div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .mainNav {
        position: relative;
        max-width: 90px;
        width: 90px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: $graySoft;
        min-height: 100vh;

        &:before {
            /*content: '';*/
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            min-height: 101vh;
            background-color: $graySoft;
        }

        &__home {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 90px;
            background-color: $mainGreen;
        }

        &__wrapper {
            width: inherit;
            position: fixed;
            top: 0;
            background-color: $graySoft;
        }

        &__logo {
            width: 52px;
            height: 28px;

            fill: $white;
        }

        &__list {
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0 0 40px;

            list-style: none;
        }

        &__listItem {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            font-family: $Roboto;
            transition: background-color ease 0.15s;
            cursor: pointer;

            &--notify {
                margin-top: auto;
            }

            &:hover {
                background-color: $white;

                .mainNav__icon {
                    color: $mainGreen;

                    svg {
                        color: inherit;
                        fill: currentColor;
                    }
                }

                .mainNav__link {
                    color: $mainGreen;
                }
            }

            &--danger {
                &:hover {
                    background-color: $white;

                    .mainNav__icon {
                        color: darken($red, 10%);

                        svg {
                            color: inherit;
                            fill: currentColor;
                        }
                    }

                    .mainNav__link {
                        color: darken($red, 10%);
                    }
                }
            }
        }

        &__listItem.is-active {
            background-color: $white;

            .mainNav__icon {
                color: $mainGreen;

                svg {
                    color: inherit;
                    fill: currentColor;
                }
            }

            .mainNav__link {
                color: $mainGreen;
            }
        }

        &__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 10px;
            width: 20px;
            height: 20px;

            color: $additionalText;
            font-size: 18px;

            transition: fill ease 0.15s;

            svg {
                width: 100%;
                height: 100%;
                color: inherit;
                fill: currentColor;
            }
        }

        &__link {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 0;

            font-size: 12px;
            font-weight: 400;
            color: $additionalText;
            text-align: center;
            text-decoration: none;

            transition: color ease 0.15s;
        }
    }
</style>
