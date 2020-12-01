<script>
export default {
    name: 'orderDownloadButton',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    render() {
        return (
            <div style="display: flex; justify-content: space-between;">
                <btn
                    target="_blank"
                    onClick={() => this.$emit('download', 'csv')}>
                    Выгрузить заказы CSV
                </btn>
            </div>
        );
    },
};
</script>

<style lang="scss"></style>
