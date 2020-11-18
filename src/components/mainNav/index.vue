<script>
    import debounce from 'lodash.debounce';

    export default {
        name: 'MainNav',

        props: {
            items: {
                type: Array,
                // required: true,
            },

            contentSelector: {
                type: String,
                default: '.wrapper__content',
            },
        },

        mounted() {
            if (process.browser) {
                window.addEventListener('resize', debounce(this.updateNav, 100));

                this.updateNav();
            }
        },

        destroyed() {
            window.removeEventListener('resize', this.updateNav);
        },

        data() {
            return {
                isMoreVisible: false,
                visibleItems: JSON.parse(JSON.stringify(this.items)),
                hiddenItems: [],
                breaks: [],
            };
        },

        methods: {
            clickOutside(e) {
                if (e.target.closest('.navList__item--more') === null && this.needClickOutside) {
                    this.hideMoreVisible();
                }
            },

            updateNav() {
                const nav = this.$refs.nav;
                const visibleList = this.$refs.visibleList;

                const availableHeight = nav ? nav.clientHeight : 0;
                const currentHeight = visibleList ? visibleList.clientHeight : 0;

                if (currentHeight > availableHeight) {
                    this.breaks.push(currentHeight);

                    const removedItem = this.visibleItems.pop();

                    if (removedItem) {
                        this.hiddenItems.unshift(removedItem);
                    }
                } else {
                    if (availableHeight > this.breaks[this.breaks.length - 1]) {
                        const removedItem = this.hiddenItems.shift();

                        if (removedItem) {
                            this.visibleItems.push(removedItem);
                        }
                        this.breaks.pop();
                    }
                }

                if (currentHeight > availableHeight) {
                    setTimeout(() => {
                        this.updateNav();
                    }, 5);
                }
            },

            toggleMoreVisible() {
                this.isMoreVisible = !this.isMoreVisible;
            },

            hideMoreVisible() {
                this.isMoreVisible = false;
            },
        },

        render() {
            const moreBtn = this.$slots.moreBtn ? this.$slots.moreBtn : 'Еще ➜';

            return (
                <div class="mainNav">
                    <router-link class="mainNav__home" to={{ path: '' }}>
                        <span class="mainNav__logo">{this.$slots.logo ? this.$slots.logo : 'Logo'}</span>
                    </router-link>

                    <div class="mainNav__wrapper" ref="nav">
                        <ul class="mainNav__list" ref="visibleList">
                            {this.visibleItems &&
                                this.visibleItems.map(item => {
                                    return (
                                        <li class="mainNav__listItem" ref="navItem">
                                            <router-link class="mainNav__link" to={item.to}>
                                                {item.icon && <img class="mainNav__icon" src={item.icon} alt="ico" />}
                                                {item.text}
                                            </router-link>
                                        </li>
                                    );
                                })}

                            {this.hiddenItems.length > 0 && (
                                <li class="mainNav__listItem">
                                    <button
                                        class={`mainNav__link mainNav__link--more ${this.isMoreVisible ? 'is-active' : ''}`}
                                        onClick={() => this.toggleMoreVisible()}>
                                        {moreBtn}
                                    </button>

                                    <ul class={`mainNav__list mainNav__list--more ${this.isMoreVisible ? 'is-active' : ''}`}>
                                        {this.hiddenItems.map(item => (
                                            <li class="mainNav__listItem">
                                                <router-link class="mainNav__link" to={item.to}>
                                                    {item.icon && <img class="mainNav__icon" src={item.icon} alt="ico" />}
                                                    {item.text}
                                                </router-link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>

                    {this.$slots.default}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .mainNav {
        @import '../../assets/reset';

        position: relative;
        max-width: 90px;
        width: 90px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: $graySoft;
        //min-height: 100vh;
        box-sizing: border-box;

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
            text-decoration: none;
        }

        &__wrapper {
            width: inherit;
            //position: fixed;
            //top: 0;
            background-color: $graySoft;
            height: 300px;
        }

        &__logo {
            width: 52px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;

            color: $white;
            fill: currentColor;
            text-align: center;

          svg  {
            width: 100%;
            height: 100%;

            fill: currentColor;
            color: inherit;
          }
        }

        &__list {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0 0 40px;

            list-style: none;

            &--more {
                position: absolute;
                bottom: 0;
                left: calc(100% + 5px);
                width: 100%;
                margin: 0;

                background: $graySoft;
                box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateX(-5px);

                transition: opacity 0.12s 0.4s ease, transform 0.12s 0.4s ease, visibility 0.12s 0.4s ease;
            }
        }

        &__list--more.is-active,
        &__list--more:hover,
        &__link--more:hover + &__list--more {
            opacity: 1;
            visibility: visible;
            transform: none;

            transition: opacity 0.12s ease, transform 0.12s ease, visibility 0.12s ease;
        }

        &__listItem {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            font-family: $FontFamily;

            &--notify {
                margin-top: auto;
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
            font-size: 10px;
        }

        &__link {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 0;

            background: none;
            border: none;
            font-size: 12px;
            font-weight: 400;
            color: $additionalText;
            text-align: center;
            text-decoration: none;
            cursor: pointer;

            transition: background-color 0.15s ease, color 0.15s ease;

            &.router-link-active,
            &:hover {
                background-color: $white;
                color: $mainGreen;

                .mainNav__icon {
                    color: $mainGreen;

                    svg {
                        color: inherit;
                        fill: currentColor;
                    }
                }
            }

            &--danger {
                &:hover {
                    background-color: $white;
                    color: darken($red, 10%);

                    .mainNav__icon {
                        color: darken($red, 10%);

                        svg {
                            color: inherit;
                            fill: currentColor;
                        }
                    }
                }
            }

            &--more {
                position: relative;

                &:before,
                &:after {
                    content: '';
                    position: absolute;
                }

                &:before {
                    top: 6px;
                    right: 6px;

                    width: 3px;
                    height: 5px;

                    border: 1px solid $gray;
                    border-left-color: transparent;
                    border-radius: 50%;
                    transform: translateY(-1px);
                    //transform: rotate(-45deg);

                    transition: transform 0.4s cubic-bezier(0.68, -3.55, 0.27, 3.55), border 0s 0.15s ease;
                }

                &:after {
                    right: 5px;
                    top: 9px;

                    width: 7px;
                    height: 6px;

                    background: $gray;
                    border-radius: 1px;
                    box-sizing: border-box;

                    transition: background 0.12s ease;
                }

                &.is-active {
                    &:after {
                        background: $mainGreen;
                        transition: background 0.12s 0.35s ease;
                    }

                    &:before {
                        transform: translateY(0);
                        border-color: $mainGreen;

                        transition: transform 0.4s cubic-bezier(0.68, -3, 0.27, 5), border 0.12s 0.35s ease;
                    }
                }
            }
        }
    }
</style>
