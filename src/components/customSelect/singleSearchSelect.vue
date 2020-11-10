<script>
    import common from './common';
    import searchMixin from './searchMixin';
    import CustomInput from '../customInput/index';

    export default {
        name: 'singleSearchSelect',

        components: {
            CustomInput,
        },

        mixins: [common, searchMixin],

        props: {
        },

        render() {
            return (
                <div class="select__singleSelect" onKeydown={e => this.keyHandler(e)}>
                    <div class={`${this.isSearch && this.hideSearchIcon === false ? 'input__wrapper select--search' : 'input__wrapper'}`}>
                        <custom-input
                            class={`select__input ${this.getInputClasses}`}
                            label={this.label}
                            readonly={this.readonly}
                            ref="input"
                            placeholder={this.placeholder}
                            v-model={this.computedValue}
                            error={this.error}
                            onClearError={() => this.$emit('clearError')}
                            onInput={e => this.onInput(e)}
                            onChange={() => this.onChange()}
                            onClick={() => this.toggle()}
                        />

                        {this.renderIcon()}

                        {this.error && <p class="select__errorMessage">{this.error}</p>}
                    </div>

                    {this.renderDropList()}
                </div>
            );
        },
    };
</script>
