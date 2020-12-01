<script>
export default {
    name: 'CustomControlsComponent',

    props: {
        name: {
            type: String,
            required: true,
        },

        item: {
            type: Object,
            required: true,
        },
    },

    computed: {
        btnComponent() {
            if (this.name) {
                return () => import(`./${this.name}.vue`);
            }

            return false;
        },
    },

    render() {
        if (this.btnComponent) {
            const BtnComponent = this.btnComponent;
            return (
                <BtnComponent
                    item={this.item}
                    onDownload={e => {
                        this.$emit('download', e);
                    }}
                    onCallback={e => this.$emit('callback', e)}
                />
            );
        }
    },
};
</script>
