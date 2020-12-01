<script>
    import CustomListItem from '@/components/customList/listItem';

    export default {
        name: 'CustomList',

        components: {
            CustomListItem
        },

        props: {
            items: {
                type: Array,
                required: true,
            },
            listItemSlot: '',

            /*
             * { showStatus: true,
             *   showEdit: true,
             *   showDelete: true,
             * }
             * */
            listItemProps: {
                type: Object,
                default() {
                    return {};
                },
            },


            /*
            * [
            *   {thumb: 'http://localhost:8080/img/logo.82b9c7a5.png'},
                {label: 'title', value: 'value'},
                [
                    {label: 'title2', value: 'value2'},
                    {label: 'title3', value: 'value3'},
                 ],
               ]
            * */
            listItemContents: {
                type: Array,
                default() {
                    return [];
                },
            },
        },

        methods: {
            updateItem(newItem) {
                console.log(newItem);
            },

            updateItemBySlot(newItem) {
              console.log(newItem);
            }
        },

        render() {
            return (
                <ul class="orderList">
                    {this.items?.length > 0 &&
                        this.items.map((item, index) => {
                            return (
                                <custom-list-item
                                    class="orderList__item customListItem"
                                    item={ item }
                                    key={
                                        typeof item.sortOrder !== 'undefined'
                                            ? item.sortOrder + ((item.slug || item.id) + '' + index)
                                            : item.id + ((item.slug || item.id) + '' + index)
                                    }
                                    props={this.listItemProps}
                                    contents={this.listItemContents}
                                    onUpdateItem={itemByComponent => this.updateItem(itemByComponent)}
                                    onStatusChange={e => this.$emit('statusChange', e)}
                                    onDeleteItem={() => this.$emit('deleteItem', index)}>
                                    {this.listItemSlot({...item, onUpdateItem: itemBySlot => this.updateItemBySlot(itemBySlot)})}
                                </custom-list-item>
                            );
                        })}

                    {this.items?.length === 0 && <p class="orderList__stab">СПИСОК ПУСТ</p>}
                </ul>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .orderList {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: $FontFamily;
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
</style>
