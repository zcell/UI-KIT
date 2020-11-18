<script>
    import common from './common';
    import CustomInput from '../customInput/index';

    export default {
        name: 'singleSelect',

        components: {
            CustomInput,
        },

        mixins: [
            common,
        ],

        render() {
            return (
                <div class="select__singleSelect" onKeydown={e => this.keyHandler(e)}>
                    <div
                        class="select__singleInner">
                        <button class={`select__singleButton ${this.isOpen ? 'isOpen' : ''} ${this.error ? 'isError' : ''}`} onClick={() => this.toggle()}>
                            {this.computedValue || this.placeholder}
                        </button>

                        {this.renderIcon()}

                        {this.error && <p class="select__errorMessage">{this.error}</p>}

                    </div>

                    {this.renderDropList()}
                </div>
            );
        },


    };
</script>