<script>
    import listItem from './listItem';

    export default {
        name: 'minimal',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem relatedNewsItem">
                    {this.getContextMenu()}

                    {this.curItem.name && (
                        <div class="customListItem__name relatedNewsItem__name">
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {this.curItem.startsAt && (
                        <div class="customListItem__name storeItem__name">
                            <p class="customListItem__text">Дата старта: {this.curItem.startsAt}</p>
                        </div>
                    )}

                    {this.curItem.endsAt && (
                        <div class="customListItem__name storeItem__name">
                            <p class="customListItem__text">Дата окончания: {this.curItem.endsAt}</p>
                        </div>
                    )}

                    {![null, undefined, ''].includes(this.curItem.sortOrder) && this.orderList.length > 0 && (
                        <custom-select
                            label="Позиция"
                            selected={this.curItem.position}
                            items={this.orderList}
                            onChange={e => this.$emit('updatePosition', e)}
                            class="sets__listItemSelect relatedNewsItem__listItemSelect"
                        />
                    )}
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .relatedNewsItem {
        justify-content: flex-start;

        &__name {
            margin: 0 20px;
        }

        &__count {
            margin-right: 50px;
            max-width: 100px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            @include below($md-desktop) {
                margin-right: 30px;
            }

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

        &__listItemSelect {
            max-width: 100px;
        }

        &__price {
            min-width: 220px;

            &:last-child {
                min-width: auto;
            }
        }
    }
</style>
