<script>
export default {
    name: 'coupons',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    render() {
        return (
            <div class="storeBlock__row">
                <div>
                    <btn
                        class="storeBlock__addBtn btn--green"
                        icon="plus"
                        onClick={() =>
                            this.$router.push({
                                name: 'marketing-slug',
                                params: { slug: this.item.id },
                            })
                        }>
                        {this.item.btnText}
                    </btn>
                </div>

                <btn
                    target="_blank"
                    onClick={() => this.$emit('downloadCoupon', 'csv')}>
                    Выгрузить купоны CSV
                </btn>
            </div>
        );
    },
};
</script>

<style lang="scss">
    .storeBlock {
        &__row {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
