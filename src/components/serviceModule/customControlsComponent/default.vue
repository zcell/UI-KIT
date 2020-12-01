<script>
export default {
    name: 'default',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    render() {
        if (![null, undefined, ''].includes(this.item.btnText)) {
            return (
                <btn
                    class="storeBlock__addBtn btn--green"
                    icon="plus"
                    onClick={() =>
                        this.$router.push({
                            path: `${this.$route.path}/${this.item.id}`,
                        })
                    }>
                    {this.item.btnText}
                </btn>
            );
        }
    },
};
</script>
