<script>
    import listItem from './listItem';

    export default {
        name: 'tickets',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem ticketItem">
                    {this.getContextMenu()}

                    {this.curItem.formType && this.curItem.formType.name && (
                        <div class="ticketItem__formType">
                            <p class="customListItem__text">{this.curItem.formType.name}</p>
                        </div>
                    )}

                    {this.curItem.name && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">Имя:</div>
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {this.curItem.phone && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">Телефон:</div>
                            <p class="customListItem__text">{this.curItem.phone}</p>
                        </div>
                    )}

                    {this.curItem.email && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">E-mail:</div>
                            <p class="customListItem__text">{this.curItem.email}</p>
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

<style lang="scss">
    .ticketItem {
        &__formType {
            max-width: 200px;
            width: 100%;

            button {
                font-size: 10px;
                color: #747678;
                text-decoration: underline;

                &:first-of-type {
                    margin-right: 20px;
                }
            }
        }

        &__col {
            min-width: 160px;
            max-width: 220px;
            margin-right: 30px;
        }

        &__colTitle {
            font-size: 12px;
            color: $gray;
        }

        &__edit {
            margin-left: auto;
        }
    }
</style>
