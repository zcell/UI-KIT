<script>
    export default {
        name: 'Pagination',

        props: {
            meta: {
                type: Object,
                required: true,
                validator(value) {
                    return (
                        value.hasOwnProperty('limit') &&
                        typeof value.limit === 'number' &&
                        value.hasOwnProperty('offset') &&
                        typeof value.offset === 'number' &&
                        value.hasOwnProperty('total') &&
                        typeof value.total === 'number'
                    );
                },
            },

            defaultLimit: {
                type: Number,
                default: 15,
            },
        },

        methods: {
            update(method) {
                let obj;

                const offset = parseInt(this.meta.offset, 10);
                const limit = parseInt(this.meta.limit, 10);

                if (typeof method === 'string') {
                    switch (method) {
                        case 'INC':
                            obj = {
                                offset: offset + this.defaultLimit,
                                limit: limit,
                            };
                            break;

                        case 'DEC':
                            obj = {
                                offset: offset > this.defaultLimit ? offset - this.defaultLimit : 0,
                                limit: limit,
                            };
                            break;

                        case 'FIRST':
                            obj = {
                                offset: 0,
                                limit: limit,
                            };
                            break;

                        case 'LAST':
                            obj = {
                                offset: limit * (this.featured - 1),
                                limit: limit,
                            };
                            break;
                    }
                } else {
                    obj = this.activePages[method];
                }

                this.$emit('update', obj);
            },
        },

        computed: {
            isFirstPage() {
                return parseInt(this.meta.offset) === 0;
            },

            isLastPage() {
                return parseInt(this.meta.offset) + this.defaultLimit >= parseInt(this.meta.total);
            },

            activePages() {
                let total = parseInt(this.meta.total);
                let limit = parseInt(this.meta.limit);

                if (this.featured) {
                    let pages = [];
                    let count = Math.ceil(total / limit);

                    for (let i = 0; i < count; i++) {
                        pages.push({
                            id: i,
                            text: i + 1,
                            offset: i === 0 ? 0 : this.defaultLimit * i,
                            limit: limit,
                        });
                    }

                    return pages;
                }
            },

            firstActivePages() {
                if (this.activePages && this.currentPage) {
                    let items = [];

                    for (let i = this.currentPage; i < this.activePages.length && i < this.currentPage + 2; i++) {
                        if (this.activePages[i]) {
                            items.push(this.activePages[i]);
                        }
                    }

                    return items;
                }
            },

            lastActivePages() {
                if (this.activePages && this.currentPage) {
                    let items = [];

                    for (let i = this.currentPage - 1; i < this.activePages.length && i > this.currentPage - 4; i--) {
                        if (this.activePages[i] && this.activePages[i].text !== this.currentPage) {
                            items.push(this.activePages[i]);
                        }
                    }

                    return items.reverse();
                }
            },

            currentPage() {
                let offset = parseInt(this.meta.offset);
                let limit = parseInt(this.meta.limit);

                if (this.meta.offset && this.meta.limit && offset >= limit) {
                    return Math.floor(offset / limit) + 1;
                }

                return 1;
            },

            featured() {
                let total = parseInt(this.meta.total);
                let limit = parseInt(this.meta.limit);

                return Math.ceil(total / limit);
            },
        },

        render() {
            return (
                <div class="pagination">
                    {this.meta.total > this.meta.limit && (
                        <div class="pagination__container">
                            <button class="pagination__action-btn" disabled={this.isFirstPage} onClick={() => this.update('DEC')}>
                                <svg width="6" height="10" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M.03 9.28l2.24-2.14.75-.72 2.23-2.14.75.71-2.24 2.15-.74.71L.78 10l-.75-.72z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.22 5.72L2.98 3.58l-.74-.72L0 .72.75 0l2.23 2.15.75.71 2.24 2.15-.75.71z"
                                    />
                                </svg>
                            </button>

                            <div class="pagination__nav">
                                {this.currentPage !== 1 && this.currentPage !== 2 && this.currentPage !== 3 && (
                                    <div class="pagination__between">
                                        <div class="pagination__item" onClick={() => this.update('FIRST')}>
                                            1
                                        </div>

                                        {this.currentPage !== 4 && <div class="pagination__item">...</div>}
                                    </div>
                                )}

                                {this.lastActivePages &&
                                    this.lastActivePages.map(item => {
                                        return (
                                            <div class="pagination__item" onClick={() => this.update(item.id)} key={item.id}>
                                                {item.text}
                                            </div>
                                        );
                                    })}

                                {((Array.isArray(this.lastActivePages) && this.lastActivePages.length !== 0) ||
                                    (Array.isArray(this.firstActivePages) && this.firstActivePages.length !== 0)) && (
                                    <div class="pagination__item pagination__item--isActive">{this.currentPage}</div>
                                )}

                                {this.firstActivePages &&
                                    this.firstActivePages.map(item => {
                                        return (
                                            <div class="pagination__item" onClick={() => this.update(item.id)} key={item.id}>
                                                {item.text}
                                            </div>
                                        );
                                    })}

                                {this.currentPage !== this.featured &&
                                    this.currentPage !== this.featured - 1 &&
                                    this.currentPage !== this.featured - 2 && (
                                        <div class="pagination__between">
                                            {this.currentPage !== this.featured - 3 && <div class="pagination__item">...</div>}
                                            <div class="pagination__item" onClick={() => this.update('LAST')}>
                                                {this.featured}
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <button class="pagination__action-btn" disabled={this.isLastPage} onClick={() => this.update('INC')}>
                                <svg width="6" height="10" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M.03 9.28l2.24-2.14.75-.72 2.23-2.14.75.71-2.24 2.15-.74.71L.78 10l-.75-.72z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.22 5.72L2.98 3.58l-.74-.72L0 .72.75 0l2.23 2.15.75.71 2.24 2.15-.75.71z"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .pagination {
        @import '../../assets/reset';

        box-sizing: border-box;

        &__container {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        &__action-btn {
            position: relative;
            min-width: 36px;
            min-height: 36px;
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: $white;
            border: 1px solid #b1b4b8;

            svg {
                right: 15px;
                width: 6px;
                height: 10px;
            }

            &:first-of-type {
                svg {
                    transform: rotate(180deg);
                }
            }

            &[disabled='disabled'] {
                background: rgba(222, 222, 222, 0.2);

                svg {
                    fill: #e1e1e1;
                }
            }
        }

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__item {
            min-width: 36px;
            min-height: 36px;
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 2px;
            margin: 0 -1px 0 -1px;

            background: $white;
            border: 1px solid #b1b4b8;
            font-family: $FontFamily;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.3;
            text-align: center;
            color: #3d4248;
            cursor: pointer;

            &:last-child {
                margin-left: 0;
            }

            &--isActive {
                background: #3aa18e;
                color: #fff;
                border: 1px solid #3aa18e;
            }
        }

        &__between {
            display: flex;
        }
    }
</style>
