<script>
    export default {
        name: 'Checkbox',

        props: {
            type: {
                type: String,
                default: '',
                validator(value) {
                    return ['roll', 'radio', ''].includes(value) === true;
                },
            },

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            input(checked) {
                if (!this.$attrs.disabled) {
                    this.$emit('input', checked);
                }
            },
        },

        render() {
            return (
                <label class={`checkbox ${this.$attrs.value ? 'is-active' : ''} ${this.type ? 'checkbox--' + this.type : ''} ${this.disabled ? 'checkbox--disabled' : ''}`}>
                    <span class="checkbox__custom" />

                    <input
                        class="checkbox__input"
                        type="checkbox"
                        checked={this.$attrs.value}
                        disabled={this.disabled}
                        onChange={e => this.input(e.target.checked)}
                    />
                    <span class="checkbox__text">{this.$slots.default}</span>
                </label>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .checkbox {
        position: relative;
        display: block;
        padding-left: 16px;

        min-height: 16px;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        user-select: none;

        &--disabled {
            pointer-events: none;
            opacity: .6;
        }

        &--radio &__custom {
            border-radius: 50%;

            &:before {
                border-radius: 50%;
            }
        }

        &--roll {
            padding-left: 32px;
        }

        &--roll &__custom {
            width: 32px;

            border-radius: 25px;

            &:before {
                left: 2px;
                right: auto;

                background-color: #747678;
                border-radius: 50%;
                transform: translateX(0);
                transition: transform ease 0.2s;
            }
        }

        &__text {
            display: block;
            margin-left: 10px;

            &:empty {
                display: none;
            }
        }

        &__input {
            display: none;
        }

        &__custom {
            position: absolute;
            left: 0;
            top: 0;

            width: 16px;
            height: 16px;
            display: inline-block;

            border: 1px solid $gray;
            border-radius: 2px;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                width: 10px;
                height: 10px;
                margin: auto;

                background: none;
                border-radius: 1px;

                transition: background-color 0.1s ease;
            }
        }

        &--disabled &__custom {
            background: rgba($gray, .2);
        }

        &.is-active {
            .checkbox__custom {
                &:before {
                    background: #3aa18e;
                }
            }
        }

        &--roll.is-active &__custom:before {
            transform: translateX(15px);
        }
    }
</style>
