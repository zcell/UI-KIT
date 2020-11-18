<script>
    import singleSelect from './singleSelect';
    import multiSelect from './multiSelect';
    import multiSearchSelect from './multiSearchSelect';
    import singleSearchSelect from './singleSearchSelect';
    import customInput from '../customInput/index';
    import searchMixin from './searchMixin';
    import common from './common';

    export default {
        name: 'index',

        components: {
            singleSelect,
            multiSelect,
            singleSearchSelect,
            multiSearchSelect,
            customInput,
        },

        props: {
            ...common.props,
            ...searchMixin.props,
        },

        data() {
            return {
                isClient: false,
                events: {
                    change: e => this.$emit('change', e),
                    input: e => this.$emit('input', e),
                    clearError: () => this.$emit('clearError'),
                },
            };
        },

        mounted() {
            if (process.browser) {
                this.isClient = true;
            }
        },

        computed: {
            isSearch() {
                return ![null, undefined, ''].includes(this.searchMethod?.url) || this.isLocalSearch;
            },
        },

        render() {
            let component = '';

            component += Array.isArray(this.selected) ? 'multi-' : 'single-';
            component += this.isSearch ? 'search-' : '';
            component += 'select';

            if (this.isClient) {
                return (
                    <div class={`select select${this.id}`}>
                        <component props={this.$props} on={this.events} />
                    </div>
                );
            } else
                return <custom-input class={`select__input`} label={this.label} readonly={this.readonly} placeholder={this.placeholder} value="" />;
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .select {
        @import '../../assets/reset';
        position: relative;
        max-width: 400px;
        width: 100%;
        min-width: 100px;
        box-sizing: border-box;

        font-family: $FontFamily;

        &__inner {
            padding-bottom: 18px;
        }

        &__singleInner {
            padding-bottom: 18px;
        }

        &__singleButton {
            width: 100%;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 10px;

            text-overflow: ellipsis;
            overflow: hidden;
            border-radius: 2px;
            border: 1px solid $inputBorder;
            background-color: $graySoft;
            color: $mainText;
            font-size: 12px;
            box-shadow: none;

            transition: border 0.1s ease, background-color 0.1s ease;
        }

        &__singleButton.isOpen {
            border: 1px solid $mainGreen;
            background-color: $white;
        }

        &__singleButton.isError {
            border: 1px solid $red;
        }

        &__hiddenInput {
            opacity: 0;
            position: absolute;
            z-index: -999;
        }

        &__errorMessage {
            position: absolute;
            bottom: 2px;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 0;

            font-size: 10px;
            color: $red;
            font-weight: 400;
            line-height: 1.2;
        }

        &__input {
            /*padding-bottom: 0;*/
            cursor: pointer;

            &--nested {
                width: 30%;
                padding: 4px 10px;
                margin: 3px 0 3px 4px;
                height: unset;
                background: #75bcaf;
                caret-color: #fff;
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                border-radius: 2px;
                white-space: nowrap;

                &:focus {
                    background: $mainGreen !important;
                }
            }

            &--hidden {
                opacity: 0;
            }

            input {
                cursor: inherit;
                width: 100%;
            }
        }

        &__label {
            display: block;
            width: 100%;
            margin-bottom: 4px;

            font-size: 12px;
            font-weight: 400;
            color: #747678;
            line-height: 1.2;
        }

        &__list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            min-height: 36px;
            margin: 0;
            padding: 0;
            padding-right: 30px;

            border: 1px solid $mainGreen;
            border-radius: 2px;
            background-color: $white;
            cursor: pointer;

            transition: background-color 0.1s ease;

            &:empty {
                border-color: transparent;
                background-color: $graySoft;
            }

            &--noPadding {
                padding-right: 0;
                position: absolute;
                z-index: 1;
                width: 100%;
                left: 0;
                top: 100%;
            }

            &.isError {
                border: 1px solid $red;
            }

            &.isOpen {
                border-color: $mainGreen;
            }
        }

        &__dropList {
            position: absolute;
            z-index: 100;
            width: 100%;
            left: 0;
            top: calc(100% - 19px);

            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            min-height: 35px;
            max-height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0;
            margin: -1px 0 0;

            border: 1px solid $mainGreen;
            border-top: none;
            border-radius: 0 0 2px 2px;
            background-color: $white;
            opacity: 1;
            transition: opacity 0.1s ease;

            &--toTop {
                margin-top: 0;
                border-top: 1px solid $mainGreen;
                border-bottom: none;
                top: auto;
                bottom: calc(100% - 19px);

                &--withoutLabel {
                    bottom: calc(100% - 1px);
                }
            }

            &--appear {
                opacity: 0;
            }
        }

        &__selectedList {
            position: absolute;
            top: 0;
            left: 0;
            max-width: 92%;
            width: 100%;
            height: 29px;
            overflow-x: auto;
            overflow-y: hidden;

            display: flex;
            justify-content: flex-start;
            align-items: center;

            list-style: none;
            cursor: pointer;
            scrollbar-width: thin;
            scrollbar-color: $graySoft;

            &.isLabel {
                top: 22px;
            }

            /* width */
            &::-webkit-scrollbar {
                height: 5px;
                border-radius: 2px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                background: $graySoft;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: #888;
            }

            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        }

        &__selectedItem {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px 4px 32px;
            margin: 3px 0 3px 4px;
            max-height: 100%;

            font-size: 14px;
            font-weight: 400;
            color: $white;
            background: #75bcaf;
            border-radius: 2px;
            white-space: nowrap;
        }

        &__delete {
            position: absolute;
            left: 5px;
            top: 50%;
            z-index: 5;

            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 20px;
            padding: 0;
            margin: 0;

            background: none;
            border: none;
            transform: translateY(-50%);

            svg {
                max-width: 100%;
                width: 100%;
                max-height: 100%;
                height: 100%;
                fill: $white;
            }
        }

        &__dropItem {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            min-height: 34px;
            padding: 10px 12px;

            font-size: 12px;
            background-color: $white;
            cursor: pointer;
            line-height: 1.2;

            &.selected {
                background-color: $mainGreen;
                color: $white;

                &:hover {
                    color: $white;
                    background-color: $additionalGreen;
                }
            }

            &--active {
                background-color: $graySoft;

                &.selected {
                    background-color: $additionalGreen;
                }
            }

            &:hover {
                background-color: $graySoft;
            }
        }

        &__iconWrapper {
            position: absolute;
            right: 12px;
            bottom: 30px;
        }

        &__icon {
            display: block;
            width: 8px;
            height: 12px;

            fill: $mainText;
            cursor: pointer;

            &--search {
                width: 14px;
                height: 14px;

                cursor: pointer;
                fill: $mainText;
            }
        }
    }
</style>
