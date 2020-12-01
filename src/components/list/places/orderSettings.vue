<script>
    import listItem from './listItem';

    export default {
        name: 'orderSettings',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem statusItem">
                    {this.getContextMenu()}

                    {this.curItem.name && (
                        <div class="customListItem__name">
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {this.curItem.name && (
                        <div class="statusItem__currentStatus">
                            {this.curItem.isOver && <status>Успешный</status>}

                            {this.curItem.isHeld && <status modifier="held">Ожидание</status>}

                            {this.curItem.isInitial && <status modifier="initial">Новый</status>}

                            {this.curItem.isDropped && <status modifier="dropped">Отмененный</status>}

                            {this.curItem.isOver === false &&
                                this.curItem.isHeld === false &&
                                this.curItem.isInitial === false &&
                                this.curItem.isDropped === false && <status modifier="etc">Рабочий</status>}
                        </div>
                    )}

                    <checkbox
                        class="checkbox--roll customListItem__checkbox statusItem__checkbox"
                        type="checkbox"
                        v-model={this.status}
                        onInput={() => this.changeStatus(this.curItem)}
                    />

                    <edit-btn
                        class="statusItem__edit"
                        onClick={() =>
                            this.$router.push({
                                name: this.$route.name + '-slug',
                                params: { slug: 'status-' + this.curItem.id },
                            })
                        }
                    />
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .statusItem {
        padding: 25px 30px;

        &__currentStatus {
            width: 100%;
            max-width: 140px;
        }

        &__checkbox {
            margin-left: 50px;
        }
    }
</style>
