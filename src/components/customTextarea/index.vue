<script>
    import { clearHtmlComments } from '@/helpers/base';

    const setResizeListeners = (el, minHeight = 90, maxHeight = 270) => {
        const validateSize = height => {
            if (height <= minHeight) return minHeight;
            if (height >= maxHeight) return maxHeight;
            return height;
        };

        const calcHeight = height => {
            const style = getComputedStyle(el);
            const borderWidth = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);

            return validateSize(height + borderWidth);
        };

        el.style.height = `${calcHeight(el.scrollHeight)}px`;

        el.addEventListener('input', () => {
            el.style.height = 'auto';
            el.style.height = `${calcHeight(el.scrollHeight)}px`;
        });
    };

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
                default: 95,
            },

            maxHeight: {
                type: Number,
                default: 275,
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

        mounted() {
            setResizeListeners(this.$refs.textarea, this.minHeight, this.maxHeight);
        },

        methods: {
            input(e) {
                this.$emit('input', clearHtmlComments(e.target.value));
            },
        },

        render() {
            return (
                <label class="textArea">
                    {this.label}
                    <textarea
                        class={`textArea__textarea ${typeof this.value === 'string' && this.value.length > 0 ? 'textArea__textarea--success' : ''}`}
                        placeholder={this.placeholder}
                        disabled={this.readonly}
                        value={this.value}
                        onInput={e => this.input(e)}
                        ref="textarea"
                        style={this.minHeight ? `min-height: ${this.minHeight}px` : ''}
                    />
                </label>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .textArea {
        @import '../../assets/reset';

        display: flex;
        flex-direction: column;
        max-width: 400px;
        width: 100%;
        margin-bottom: 18px;
        box-sizing: border-box;

        font-family: $FontFamily;
        font-weight: 400;
        font-size: 12px;
        color: #747678;

        &__textarea {
            padding: 10px;

            background: $graySoft;
            border: 1px solid $inputBorder;
            border-radius: 2px;
            font-family: $FontFamily;
            color: $mainText;
            font-size: 12px;
            resize: vertical;

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
