<script>
    export default {
        name: 'List',

        props: {
            place: {
                type: String,
                required: true,
            },
            items: {
                type: Array,
                required: true,
            },
            orderList: {
                type: Array,
                default() {
                    return [];
                },
            },
            isFixedBundle: {
                default() {
                    return false;
                },
            },
        },

        computed: {
            listComponent() {
                return () => import(`./places/${this.place}.vue`);
            },
        },

        render() {
            const ListComponent = this.listComponent;
            return (
                <ul class="orderList">
                    {this.items?.length > 0 &&
                        this.items.map((item, index) => {
                            return (
                                <ListComponent
                                    class="orderList__item"
                                    item={item}
                                    key={
                                        typeof item.sortOrder !== 'undefined'
                                            ? item.sortOrder + ((item.slug || item.id) + '' + index)
                                            : item.id + ((item.slug || item.id) + '' + index)
                                    }
                                    checkbox={item.status ? item.status : null}
                                    is-fixed-bundle={this.isFixedBundle}
                                    order-list={this.orderList}
                                    onUpdateItemQuantity={e =>
                                        this.$emit('updateItemQuantity', {
                                            quantity: e,
                                            index: index,
                                        })
                                    }
                                    onStatusChange={e => this.$emit('statusChange', e)}
                                    onDeleteItem={() => this.$emit('deleteItem', index)}
                                    onUpdatePosition={e =>
                                        this.$emit('updatePosition', {
                                            e,
                                            item: item,
                                        })
                                    }
                                    onCallback={e => this.$emit('callback', e)}
                                    onUpdateItem={e => {
                                        item = e;
                                        this.$emit('updateAttributes', this.items)
                                    }}
                                />
                            );
                        })}

                    {this.items?.length === 0 && <p class="orderList__stab">СПИСОК ПУСТ</p>}
                    
                </ul>
            );
        },
    };
</script>

<style lang="scss">
    .orderList {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        font-family: $Roboto;
        list-style: none;

        &__stab {
            width: 100%;
            text-align: center;
        }

        &__item {
            margin-bottom: 10px;

            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }

    .customListItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px 30px;
        width: 100%;

        font-family: $Roboto;
        border: 1px solid $gray;
        border-radius: 2px;
        background: $white;

        &__thumb {
            width: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;

            @include below($md-desktop) {
                margin-right: 15px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &__text {
            max-width: 100%;

            font-weight: 400;
            font-size: 14px;
            color: #3d4248;
        }

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
            margin-right: auto;
            max-width: 200px;
            width: 100%;
        }

        &__count {
            margin-right: 50px;
            max-width: 100px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            p,
            a {
                display: block;
                width: 100%;
                text-align: center;
                color: #747678;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &__checkbox {
            margin-right: 50px;
            height: 16px;

            @include below($md-desktop) {
                margin-right: 30px;
            }
        }

        &__category {
            margin: 0 auto;

            &--landing {
                margin: 0 auto 0 0;
            }

            p,
            a {
                color: #747678;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &__price {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            min-width: 140px;

            font-size: 14px;
        }

        &__priceValue {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 5px;
        }

        &__priceOffers {
            font-size: 10px;
            color: $additionalText;
        }

        &__info {
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

        &__contextMenu {
            position: relative;
            margin-right: 25px;

            @include below($md-desktop) {
                margin-right: 15px;
            }
        }

        &__contextBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            margin: 0 -5px;
        }

        &__menuIcon {
            width: 4px;
            height: 16px;

            fill: #3d4248;
        }

        &__dropMenu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1;
        }
    }
</style>
