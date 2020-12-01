<script>
    export default {
        name: 'FilterPanel',

        props: {
            query: {
                type: Object,
            },
            storageID: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                sortDefaultOrder: [
                    {
                        id: 'asc',
                        value: 'По возрастанию',
                    },
                    {
                        id: 'desc',
                        value: 'По убыванию',
                    },
                ],
            };
        },

        methods: {
            update() {
                let query = this.currQuery;
                if (query.hasOwnProperty('offset')) {
                    query.offset = undefined;
                    delete query.offset;
                }
                if (query) {
                    this.$emit('update', JSON.parse(JSON.stringify(query)));
                    if (process.browser && (this.currQuery?.sortParams || []).length > 0) {
                        localStorage.setItem(this.storageID, JSON.stringify({order: query.order, sort: query.sort}));
                    }
                }
            },

            searchChange(e) {
                this.currQuery.text = e || '';
                this.update();
            },

            searchByChange(e) {
                this.currQuery.search = e.id || 'name';
                this.update();
            },

            sortChange(e) {
                this.currQuery.sort = e.id || '';
                this.update();
            },

            sortOrderChange(e) {
                this.currQuery.order = e.id || '';
                this.update();
            },
        },

        computed: {
            currQuery() {
                return this.query;
            },

            selectedSearchByParam() {
                let currSearchParam = this.currQuery.search;

                if (currSearchParam) {
                    let clone = (this.currQuery.searchFields || []).find(i => i.id === currSearchParam);

                    if (clone) {
                        return clone;
                    }
                }

                return {
                    id: null,
                    value: null,
                };
            },

            selectedSortParam() {
                let currSortParam = this.currQuery?.sort;

                if (Array.isArray(currSortParam) && currSortParam.length > 0) {
                    let clone = (this.currQuery.sortParams || []).find(i => i.id === currSortParam[0]);

                    if (clone) {
                        return clone;
                    }
                } else if (currSortParam) {
                    let clone = (this.currQuery.sortParams || []).find(i => i.id === currSortParam);

                    if (clone) {
                        return clone;
                    }
                }

                return {
                    id: null,
                    value: null,
                };
            },

            selectedSortOrder() {
                let currSortOrder = this.currQuery?.order;

                if (Array.isArray(currSortOrder) && currSortOrder.length > 0) {
                    let clone = (this.sortDefaultOrder || []).find(i => i.id === currSortOrder[0]);

                    if (clone) {
                        return clone;
                    }
                } else if (currSortOrder) {
                    let clone = (this.sortDefaultOrder || []).find(i => i.id === currSortOrder);

                    if (clone) {
                        return clone;
                    }
                }

                return {
                    id: null,
                    value: null,
                };
            },
        },

        render() {
            if (this.currQuery) {
                return (
                    <div>
                        <div class="filterPanel">
                            {(this.currQuery?.searchFields || []).length > 0 && (
                                <custom-select
                                    class="filterPanel__searchBy"
                                    label="Поиск по полю:"
                                    items={this.currQuery.searchFields}
                                    selected={this.selectedSearchByParam}
                                    selectedItems={[this.selectedSearchByParam || {}]}
                                    onChange={e => this.searchByChange(e)}
                                    required={true}
                                />
                            )}

                            {this.currQuery?.text !== undefined && (
                                <custom-input
                                    label="Поиск"
                                    class="filterPanel__search"
                                    value={this.currQuery.text}
                                    onInput={e => this.searchChange(e)}
                                />
                            )}

                            {(this.currQuery?.sortParams || []).length > 0 && (
                                <div class="filterPanel__sort">
                                    <custom-select
                                        class="filterPanel__sortInput"
                                        label="Сортировка по:"
                                        items={this.currQuery.sortParams}
                                        selected={this.selectedSortParam}
                                        selectedItems={[this.selectedSortParam || {}]}
                                        onChange={e => this.sortChange(e)}
                                        required={true}
                                    />

                                    <custom-select
                                        class="filterPanel__sortInput"
                                        label="Направление:"
                                        items={this.sortDefaultOrder}
                                        selected={this.selectedSortOrder}
                                        selectedItems={[this.selectedSortOrder || {}]}
                                        onChange={e => this.sortOrderChange(e)}
                                        required={true}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            }
        },
    };
</script>

<style lang="scss">
    .filterPanel {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 18px;

        &__searchBy {
            width: 180px;
            margin-right: 10px;
        }

        &__search {
            padding-bottom: 18px;
            margin-right: 10px;
            width: 360px;
            flex-shrink: 2;
        }

        &__sort {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 320px;
            margin-left: auto;
        }

        &__sortInput {
            margin-right: 10px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
