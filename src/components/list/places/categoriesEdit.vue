<script>
    import listItem from './listItem';

    export default {
        name: 'categoriesEdit',

        mixins: [listItem],

        methods: {
            changeFlag({flag, value}) {
                this.curItem[flag] = value;
                this.$emit('updateItem', this.curItem)
            },
        },

        render() {
            return (
                <li class="customListItem categoriesItem">
                    {this.getContextMenu()}

                    {this.curItem.name && (
                        <div class="customListItem__name">
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {this.curItem.group && ![null, undefined, ''].includes(this.curItem.group.name) && (
                        <div class="customListItem__name">
                            <p class="customListItem__text">{this.curItem.group.name}</p>
                        </div>
                    )}

                    {![null, undefined, ''].includes(this.curItem.showInDetail) && (
                        <div class="customListItem__checkbox categoriesItem__checkbox">
                            <checkbox value={this.curItem.showInDetail} onInput={e => this.changeFlag({ flag: 'showInDetail', value: e })}>
                                Показывать в карточке товара
                            </checkbox>
                        </div>
                    )}

                    {![null, undefined, ''].includes(this.curItem.useForFilter) && (
                        <div class="customListItem__checkbox categoriesItem__checkbox">
                            <checkbox value={this.curItem.useForFilter} onInput={e => this.changeFlag({ flag: 'useForFilter', value: e })}>
                                Использовать для фильтрации
                            </checkbox>
                        </div>
                    )}
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .categoriesItem {
        &__checkbox {
            @include below($md-desktop) {
                margin-right: 25px;
            }
        }

        &__count {
            @include below($md-desktop) {
                margin-right: 25px;
            }
        }

        &__textUnderline {
            max-width: 100%;

            font-weight: 400;
            font-size: 14px;
            color: #747678;
            text-decoration: underline;
        }

        &__priceOffers {
            width: 100%;
        }
    }
</style>
