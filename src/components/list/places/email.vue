<script>
    import listItem from './listItem';

    export default {
        name: 'email',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem emailItem">
                    {this.getContextMenu()}

                    <div class="customListItem__name emailItem__name">
                        {this.curItem.name && <p class="customListItem__text">{this.curItem.name}</p>}
                    </div>

                    {this.curItem.email && (
                        <div class="ticketItem__col">
                            <div class="ticketItem__colTitle">E-mail:</div>
                            <p class="customListItem__text">{this.curItem.email}</p>
                        </div>
                    )}

                    {this.$route.name !== 'pages-slug' && this.$route.hash !== '#couponBatches' && this.$route.name !== 'bundles-slug' && (
                        <edit-btn
                            class="emailItem__edit"
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
    .emailItem {
        &__user {
            display: flex;
            max-width: 200px;
            width: 200px;
        }

        &__slug {
            margin-right: auto;
            max-width: 200px;
            width: 100%;
        }

        &__name {
            margin-right: 20px;
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
