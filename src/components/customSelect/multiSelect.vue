<script>
    import common from './common';
    import {fieldExtractor} from './helper';
    import CustomInput from '../customInput/index';
    import multiMixin from './multiMixin';

    export default {
        name: 'multiSelect',

        components: {
            CustomInput,
        },

        mixins: [common, multiMixin],

        render() {
            return (
                <div class="select__multiSelect" onKeydown={e => this.keyHandler(e)}>
                    <div class="select__inner">
                        <span class="select__label">{this.label}</span>
                        <input ref="hiddenMultiple" type="text" class="select__hiddenInput" />
                        <ul
                            class={`select__list ${this.getListClasses}`}
                            onClick={() => {
                                this.$refs.hiddenMultiple.focus();
                                this.toggle();
                            }}>
                            {this.currSelected &&
                                this.currSelected.length > 0 &&
                                this.currSelected.map(item => {
                                    return (
                                        <li class="select__selectedItem">
                                            <button
                                                class="select__delete"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.deleteSelectedItem(item);
                                                }}>
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M34 1H2a1 1 0 00-1 1v32c0 .6.4 1 1 1h32c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zM2 0a2 2 0 00-2 2v32c0 1.1.9 2 2 2h32a2 2 0 002-2V2a2 2 0 00-2-2H2z"
                                                    />
                                                    <path d="M24.5 9.6L18 16.1l-6.5-6.5-1.9 1.9 6.5 6.5-6.5 6.5 1.9 1.9 6.5-6.5 6.5 6.5 1.9-1.9-6.5-6.5 6.5-6.5-1.9-1.9z" />
                                                </svg>
                                            </button>
                                            {fieldExtractor(item || {}, this.fields.value)}
                                        </li>
                                    );
                                })}
                        </ul>

                        {this.renderIcon()}

                        {this.error && <p class="select__errorMessage">{this.error}</p>}
                    </div>

                    {this.renderDropList()}
                </div>
            );
        },
    };
</script>
