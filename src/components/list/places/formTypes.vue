<script>
    import listItem from './listItem';

    export default {
        name: 'formTypes',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem ticketItem">
                    {this.getContextMenu()}

                    {this.curItem.name && (
                        <div class="ticketItem__formType">
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {this.curItem.code && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">Код:</div>
                            <p class="customListItem__text">{this.curItem.code}</p>
                        </div>
                    )}

                    {this.curItem.ticketCount && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">Кол-во заявок:</div>
                            <p class="customListItem__text">{this.curItem.ticketCount}</p>
                        </div>
                    )}

                    {this.$route.name !== 'pages-slug' && this.$route.hash !== '#couponBatches' && this.$route.name !== 'bundles-slug' && (
                        <edit-btn
                            class="ticketItem__edit"
                            onClick={() =>
                                this.$router.push({
                                    name: this.$route.name + '-slug',
                                    params: { slug: this.curItem.slug },
                                })
                            }
                        />
                    )}
                </li>
            );
        },
    };
</script>
