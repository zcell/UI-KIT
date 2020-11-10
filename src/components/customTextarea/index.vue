<script>
    import { clearHtmlComments } from '../../helpers/base';

    export default {
        name: 'CustomTextarea',

        props: {
            value: {
                default: '',
            },

            label: {
                type: String,
                default: '',
            },

            minHeight: {
                type: Number,
                default: 96,
            },

            maxHeight: {
                type: Number,
                default: 475,
            },

            placeholder: {
                type: String,
                default: '',
            },

            readonly: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            input(e) {
                this.$emit('input', clearHtmlComments(e));
            },
        },

        render() {
            return (
                <label class="textArea">
                    {this.label}
                    <textarea-autosize
                        class={`textArea__textarea ${
                            typeof this.value === 'string' &&
                            this.value.length > 0
                                ? 'textArea__textarea--success'
                                : ''
                        }`}
                        placeholder={this.placeholder}
                        disabled={this.readonly}
                        value={this.value}
                        onInput={e => this.input(e)}
                        min-height={this.minHeight}
                        max-height={this.maxHeight}
                    />

                </label>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .textArea {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        width: 100%;
        margin-bottom: 18px;

        font-family: $Roboto;
        font-weight: 400;
        font-size: 12px;
        color: #747678;

        &__textarea {
            padding: 10px;

            background: $graySoft;
            border: 1px solid $inputBorder;
            border-radius: 2px;
            font-family: $Roboto;
            color: $mainText;
            font-size: 12px;

            transition: background-color 0.1s ease, border 0.1s ease;

            &::placeholder {
                color: $gray;
            }

            &[disabled='disabled'] {
                background: $graySoft;
                border: 1px solid $gray !important;
            }

            &:focus {
                background: #ffffff;
                border: 1px solid $mainGreen;
            }

            &--success {
                background: $graySoft;
                border: 1px solid $inputBorder;
            }
        }
    }
</style>
