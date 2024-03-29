<script>
    export default {
        name: 'Counter',
        props: {
            quantity: {
                required: true,
            },
            disabled: {},
            required: {
                type: Boolean,
                default() {
                    return true;
                },
            },
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
        },
        watch: {
            propQuantity() {
                if (this.propQuantity !== this.value) {
                    this.value = this.propQuantity;
                }
            },

            dataValue() {
                if (this.propQuantity !== this.value) {
                    this.value = this.propQuantity;
                }
            },
        },
        data() {
            return {
                value: this.quantity ? this.quantity : 0,
            };
        },
        methods: {
            change(action) {
                if (this.disabled) {
                    return;
                }
                let value = null;
                if (!action.value) {
                    action.value = 0;
                }
                if (action.action === 'INCREMENT') {
                    value = parseFloat(action.value, 10) + 1;
                }
                if (action.action === 'DECREMENT') {
                    value = parseFloat(action.value, 10) - 1;
                }
                if (action.action === 'INPUT') {
                    value = parseFloat(action.value, 10);
                }

                if (value < this.min) {
                    value = this.min;
                }

                if (value > this.max) {
                    value = this.max;
                }

                this.value = value;
                this.$emit('change', value);
            },
        },
        computed: {
            propQuantity() {
                if (typeof this.quantity === 'number') {
                    return this.quantity;
                }
            },
            dataValue() {
                if (typeof this.quantity === 'number') {
                    return this.value;
                }
            },
        },
        render() {
            return (
                <div class={`counter ${this.disabled ? 'counter--disabled' : ''}`}>
                    <button
                        class="counter__item counter__item--button counter__item--minus"
                        name="decrement"
                        onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();

                            this.change({
                                action: 'DECREMENT',
                                value: this.quantity,
                            });
                        }}>
                        <svg class="counter__icon" width="10" height="2" viewBox="0 0 10 2" fill="" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10 1.71422H5.71429H4.28571H0V0.285645H4.28571L5.71429 0.285784L10 0.285645V1.71422Z"
                                fill=""
                            />
                        </svg>
                    </button>
                    <label class="counter__item">
                        <span class="visually-hidden" hidden>
                            Counter
                        </span>
                        <input
                            type="number"
                            class="counter__field"
                            v-model={this.value}
                            disabled={this.disabled}
                            onBlur={() => this.change({ action: 'INPUT', value: this.value })}
                            onInput={e => this.change({ action: 'INPUT', value: e.target.value })}
                            onKeyup={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (e.key === 'Enter') {
                                    this.change({ action: 'INPUT', value: this.value });
                                }
                            }}
                        />
                    </label>
                    <button
                        class="counter__item counter__item--button counter__item--plus"
                        name="increment"
                        onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.change({
                                action: 'INCREMENT',
                                value: this.quantity,
                            });
                        }}>
                        <svg class="counter__icon" width="14" height="14" viewBox="0 0 14 14" fill="" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="" />
                        </svg>
                    </button>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .counter {
        @import '../../assets/reset';
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        width: 90px;
        height: 36px;
        box-sizing: border-box;

        background-color: $white;
        font-family: $FontFamily;
        border: 1px solid $gray;
        border-radius: 2px;
        overflow: hidden;

        &--disabled {
            border: 1px solid #f3f4f4;
            background-color: #f3f4f4;

            .counter__item--button.counter__item,
            .counter__item {
                background-color: #f3f4f4;
                cursor: default;

                .counter__item:hover {
                    background-color: #f3f4f4;
                    cursor: default;
                }
            }

            .counter__field[disabled] {
                background-color: #f3f4f4;
            }

            .counter__item--button:hover .counter__icon {
                cursor: default;
                fill: $mainText;
            }
        }

        &__item {
            position: relative;

            width: calc(100% / 3);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1px;

            background: $white;
            transition: all ease 0.15s;
            border: none;
            border-radius: 2px;
            cursor: pointer;

            &--button:hover {
                background: $additionalGreen;

                .counter__icon {
                    fill: $white;
                }
            }
        }

        &__field {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;

            appearance: none;
            font-size: 14px;
            color: #3d4248;
            font-weight: 400;
            text-align: center;
            box-shadow: none;
            border: 0;
            box-sizing: border-box;
            text-overflow: ellipsis;

            &:hover {
                background: $white;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &[type='number'] {
                -moz-appearance: textfield;
            }
        }

        &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40%;
            height: 40%;

            fill: #3d4248;

            transition: fill 0.15s ease;
        }

        &--large & {
            width: 400px;
            max-width: 100%;

            &__item:nth-child(2) {
                width: 80%;
            }

            &__item:nth-child(1),
            &__item:nth-child(3) {
                width: 10%;
            }
        }
    }
</style>
