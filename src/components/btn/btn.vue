<script>
    export default {
        name: 'Btn',

        props: {
            type: {
                type: String,
                default: '',
                validator(value) {
                    return ['success', 'danger', ''].includes(value) === true;
                },
            },
            error: {
                default: null,
            },
            iconPosition: {
                type: String,
                default: 'last',
                validator(value) {
                    return ['first', 'last', 'top', 'bottom'].includes(value) === true;
                },
            },
        },

        computed: {
            buttonClass() {
                let className = 'btn';
                if (this.error) {
                    className += ' isError ';
                }

                if (this.type === 'success') {
                    className += ' btn--success ';
                }

                if (this.type === 'danger') {
                    className += ' btn--danger ';
                }

                if (this.iconPosition === 'first') {
                    className += ' btn--icon-first ';
                }

                if (this.iconPosition === 'last') {
                    className += ' btn--icon-last ';
                }

                if (this.iconPosition === 'top') {
                    className += ' btn--icon-top ';
                }

                if (this.iconPosition === 'bottom') {
                    className += ' btn--icon-bottom ';
                }

                return className;
            },
        },

        render() {
            return (
                <button
                    class={this.buttonClass}
                    name="btn"
                    onFocus={() => this.$emit('clearError')}
                    onClick={() => this.$emit('click')}
                    onDblclick={() => this.$emit('dblclick')}>
                    {this.$slots.default}

                    {this.$slots.icon}

                    {this.error && <p class="btn__errorMessage">{this.error}</p>}
                </button>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .btn {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-height: 50px;
        padding: 10px 30px;

        font-family: inherit;
        font-weight: 500;
        font-size: 12px;
        white-space: nowrap;
        text-decoration: none;

        background: $white;
        border: 1px solid $gray;
        border-radius: 100px;
        color: #3d4248;
        cursor: pointer;

        transition: all ease 0.15s;

        @include below($md-desktop) {
            min-width: 180px;
        }

        &.is-active {
            color: #fff;
            background: #3d4248;
            border: 1px solid #3d4248;

            &:hover {
                background: #3d4248;
                border: 1px solid #3d4248;
            }
        }

        &:focus {
            outline: none;
            border: 1px solid $additionalGreen;
            background: $additionalGreen;
            color: $white;
        }

        &:hover {
            border: 1px solid $additionalGreen;
            background: $additionalGreen;
            color: $white;
        }

        &--success {
            color: $white;
            background: $mainGreen;
            border: 1px solid $mainGreen;

            &:hover {
                background: $additionalGreen;
            }
        }

        &--danger {
            color: $white;
            background-color: $red;
            border: 1px solid transparent;

            &:hover,
            &:focus {
                background-color: darken($red, 10%);
                border: 1px solid transparent;
            }
        }

        &--icon {
            padding-right: 50px;
        }

        &__icon {
            position: absolute;
            right: 14px;
            top: 10px;

            width: 14px;
            height: 14px;

            fill: $white;
        }

        &.isError {
            background-color: $red;
            border-color: $red;
        }

        &__errorMessage {
            position: absolute;
            top: calc(100% + 3px);
            left: 0;
            width: 100%;

            font-size: 10px;
            color: $red;
            font-weight: 400;
            text-align: left;
            line-height: 1.2;
        }

        &--icon-first {
            flex-direction: row-reverse;

            img,
            svg,
            picture {
                margin-right: 10px;
            }
        }

        &--icon-last {
            flex-direction: row;

            img,
            svg,
            picture {
                margin-left: 10px;
            }
        }

        &--icon-top {
            flex-direction: column-reverse;
            align-items: center;

            img,
            svg,
            picture {
                margin-bottom: 10px;
            }
        }

        &--icon-bottom {
            flex-direction: column;
            align-items: center;

            img,
            svg,
            picture {
                margin-top: 10px;
            }
        }
    }
</style>
