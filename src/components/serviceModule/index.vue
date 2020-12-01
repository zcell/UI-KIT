<script>
    import DefaultHeading from '../defaultHeading/index';
    import CustomControlsComponent from './customControlsComponent/index';
    import List from '../list/index';
    import Pagination from '../../components/pagination/index';
    import FilterPanel from './filterPanel/index';
    import swal from '../../helpers/sweetAlert';
    const base = require('../../base.config');

    export default {
        name: 'ServiceModule',

        components: {
            FilterPanel,
            List,
            DefaultHeading,
            Pagination,
            CustomControlsComponent,
        },

        props: {
            componentName: {
                type: String,
                default: '',
            },
            tabs: {
                type: Array,
                required: true,
            },
            title: {
                type: String,
                default() {
                    return '';
                },
            },
            isPanelNeeded: {
                type: Boolean,
                default: true,
            },
        },

        data() {
            return {
                isTabDisabled: false,
                defaultLimit: base.defaultLimit,
                currentTab: null,
                isInitialRequest: true,
                arrayQueryParams: ['sort', 'order', 'category', 'batchId'],
                commonQueryParams: ['search', 'offset', 'text', 'sort', 'order'],
            };
        },

        methods: {
            async filterPanelUpdate(e) {
                if (!this.currentTab?.query) {
                    this.currentTab.query = {};
                }
                for (let k in e) {
                    if (e.hasOwnProperty(k) && ['offset', 'searchFields', 'sortParams'].includes(k) === false) {
                        this.currentTab.query[k] = e[k];
                    }
                }

                this.currentTab.query.offset = 0;

                await this.fetchList({ ...JSON.parse(JSON.stringify(this.currentTab)) }, this.isInitialRequest);

                if (this.isInitialRequest === true) {
                    this.isInitialRequest = false;
                }
            },

            async tabChanged(e) {
                this.isTabDisabled = true;

                const breadcrumbs = [
                    {
                        componentName: this.componentName,
                        name: this.title,
                    },
                    {
                        componentName: this.componentName,
                        name: e.tab.name,
                        hash: e.tab.hash,
                    },
                ];

                this.$store.commit('breadcrumbs/setBreadcrumbs', breadcrumbs);

                let currentTab = this.tabs.find(item => item.id === e.tab.id);
                if (currentTab) {
                    currentTab = JSON.parse(JSON.stringify(currentTab));

                    if (!currentTab.query) {
                        currentTab.query = {};
                    }

                    // if (Array.isArray(currentTab.searchFields) && currentTab.searchFields.length > 0) {
                    //     currentTab.query.search = null;
                    // } else {
                    //     currentTab.query.search = currentTab.query?.search || 'name';
                    // }

                    currentTab.query.text = null;
                    currentTab.query.offset = 0;
                    currentTab.query.search = currentTab.query?.search || null;
                    currentTab = await this.getQueryFromStorage(currentTab);
                    this.currentTab = currentTab;
                }

                await this.fetchList(currentTab, this.isInitialRequest);

                if (this.isInitialRequest === true) {
                    this.isInitialRequest = false;
                }

                this.isTabDisabled = false;
            },

            async getQueryFromStorage(tab) {
                let storageID = `${this.tabs.find(i => i.id === tab.id).id}__${this.tabs.find(i => i.id === tab.id).field}`;
                let copy = { ...tab.query };
                if (copy) {
                    let storageParams = await JSON.parse(localStorage.getItem(storageID));
                    if (storageParams) {
                        for (let k in storageParams) {
                            if (storageParams.hasOwnProperty(k)) {
                                copy[k] = storageParams[k];
                            }
                        }
                    } else {
                        copy.sort = copy?.sort || null;
                        copy.order = copy?.order || null;
                    }
                    tab.query = copy;
                    return tab;
                }
            },

            async fetchList(currentTab, isInitial = false) {
                currentTab = JSON.parse(JSON.stringify(currentTab));
                let routeQuery = JSON.parse(JSON.stringify(this.$route.query));
                let tabQuery = currentTab?.query;

                if (!tabQuery) {
                    tabQuery = {};
                }

                if (!routeQuery) {
                    routeQuery = {};
                }

                if (isInitial === true) {
                    for (let k in tabQuery) {
                        if (tabQuery.hasOwnProperty(k) && !routeQuery[k] && ![null, undefined, ''].includes(tabQuery[k])) {
                            routeQuery[k] = tabQuery[k];

                            if (Array.isArray(tabQuery[k]) && Array.isArray(routeQuery[k])) {
                                routeQuery[k] = routeQuery[k].concat(tabQuery[k]).filter((v, i, a) => {
                                    return a.findIndex(item => item === v) === i;
                                });
                            }
                        }
                    }
                } else if (isInitial === false) {
                    routeQuery = Object.assign({}, routeQuery, tabQuery);
                }

                this.currentTab.query = routeQuery;

                for (let k in routeQuery) {
                    if (routeQuery.hasOwnProperty(k) && this.arrayQueryParams.includes(k) && Array.isArray(routeQuery[k]) === false) {
                        routeQuery[k] = [routeQuery[k]];
                    }
                }

                currentTab.query = routeQuery;

                let queryStr = `?limit=${this.defaultLimit}`;
                for (let k in currentTab.query) {
                    if (
                        currentTab.query.hasOwnProperty(k) &&
                        this.commonQueryParams.includes(k) === false &&
                        (currentTab.reservedQueryParams || []).includes(k) === false
                    ) {
                        currentTab.query[k] = undefined;
                        delete currentTab.query[k];
                    }
                    if (currentTab.query.hasOwnProperty(k) && ![null, undefined, ''].includes(currentTab.query[k])) {
                        if (Array.isArray(currentTab.query[k])) {
                            currentTab.query[k].forEach(item => {
                                if ([null, 'null', '', undefined].includes(item) === false) {
                                    queryStr += `&${k}[]=${item}`;
                                }
                            });
                        } else {
                            queryStr += `&${k}=${currentTab.query[k]}`;
                        }
                    }
                }

                this.$router.push({ query: currentTab.query, hash: '#' + currentTab.id || this.$route.hash });
                let url = `${currentTab.url}${queryStr}`;
                currentTab = { ...currentTab, url };
                await this.$store.dispatch('pages/getDataList', currentTab);
                this.isTabDisabled = false;
            },

            async deleteItem(index) {
                let itemId = this.getList?.[index]?.id;

                if ((itemId && this.getList?.[index]?.isHome === false) || !this.getList?.[index]?.isHome) {
                    await swal.getConfirmAlert()
                         .then(async result => {
                        if (result.value) {
                            await this.$axios
                                .$delete(`${this.currentTab.url}/${itemId}`)
                                .then(async () => {
                                    await this.fetchList(this.currentTab, false).then(() => {
                                        swal.getSuccessAlert({text: 'Запись удалена'})
                                    });
                                    if (this.getMeta?.total % this.defaultLimit === 0) {
                                        this.paginate({ offset: this.getMeta.offset - this.defaultLimit });
                                    }
                                })
                                .catch(error => {
                                    swal.getErrorAlert({text: 'Произошла ошибка'})
                                    console.log(error);
                                });
                        }
                    });
                } else {
                    swal.getErrorAlert({text: 'Нельзя удалить Главную страницу!'})
                }
            },

            async changeStatus(e) {
                await this.$axios.$post(`${this.currentTab.url}/${e.id}/switch/${e.field}`);
            },

            paginate(e) {
                let curTab = JSON.parse(JSON.stringify(this.currentTab));
                curTab.query = {
                    ...curTab.query,
                    ...this.$route.query,
                    offset: e.offset || 0,
                };
                // this.currentTab = curTab;
                this.fetchList(curTab);
            },

            async download(type) {
                await this.$axios
                    .get(`${this.currentTab.url}/export/` + type)
                    .then(response => {
                        let element = document.createElement('a');
                        element.setAttribute('href', 'data:' + response.headers.contentType + ',' + encodeURIComponent(response.data));
                        element.setAttribute('download', `${this.currentTab.id}.` + type);

                        element.style.display = 'none';
                        document.body.appendChild(element);

                        element.click();

                        document.body.removeChild(element);
                    })
                    .catch(err => console.log(err));
            },
        },

        computed: {
            getList() {
                return this.$store.getters['pages/getList'];
            },

            getMeta() {
                return this.$store.getters['pages/getMeta'];
            },

            filterQueryParams() {
                if (this.currentTab) {
                    let obj = {
                        ...this.currentTab?.query,
                        searchFields: Array.isArray(this.currentTab?.searchFields) ? this.currentTab.searchFields : [],
                        sortParams: Array.isArray(this.currentTab?.sortParams) ? this.currentTab.sortParams : [],
                        text: this.currentTab?.query.text || null,
                        // filterParams: Array.isArray(this.currentTab?.filterParams) ? this.currentTab.filterParams : [],
                    };

                    //устанавливаем выбранный по умолчанию.
                    // if (!obj.search && Array.isArray(obj.searchFields) && obj.searchFields.length > 0) {
                    //     obj.search = obj.searchFields[0]?.id;
                    // }
                    return obj;
                }
            },

            storageID() {
                return `${this.currentTab.id}__${this.currentTab.field}`;
            },
        },

        render() {
            return (
                <div class="store page serviceModule">
                    <default-heading class="store__heading" title={this.title} is-controls-need={this.componentName === 'order'} />

                    {this.isPanelNeeded && this.filterQueryParams && (
                        <filter-panel query={this.filterQueryParams} onUpdate={e => this.filterPanelUpdate(e)} storageID={this.storageID} />
                    )}

                    <div class="store__box">
                        <tabs class="defaultTabs store__tabs" onChanged={e => this.tabChanged(e)}>
                            {this.tabs.map(item => {
                                return (
                                    <tab isDisabled={this.isTabDisabled} id={item.id} disabled={true} key={item.id} name={item.name}>
                                        {item.controlComponent && (
                                            <CustomControlsComponent
                                                class="serviceModule__controls"
                                                name={item.controlComponent}
                                                item={item}
                                                onDownload={e => this.download(e)}
                                                onCallback={e => {
                                                    if (typeof (item?.callbacks || {})[e] === 'function') {
                                                        let currentTab = JSON.parse(JSON.stringify(this.currentTab));
                                                        item.callbacks[e]({ fetchMethod: this.fetchList, tab: currentTab });
                                                    }
                                                }}
                                            />
                                        )}

                                        {this.getList && this.hasReadPermission(item.alias) && (
                                            <list
                                                items={this.getList}
                                                place={item.place}
                                                onDeleteItem={e => this.deleteItem(e, item)}
                                                onStatusChange={e => this.changeStatus(e, item)}
                                                onCallback={e => {
                                                    if (typeof (item?.callbacks || {})[e.methodName] === 'function') {
                                                        let currentTab = JSON.parse(JSON.stringify(this.tabs.find(tab => (tab.id = 'coupons'))));
                                                        item.callbacks[e.methodName]({
                                                            fetchMethod: this.fetchList,
                                                            tab: currentTab,
                                                            batchId: e.id,
                                                        });
                                                    }
                                                }}
                                            />
                                        )}
                                    </tab>
                                );
                            })}
                        </tabs>
                    </div>

                    {this.getMeta && (
                        <pagination
                            class="store__pagination"
                            default-limit={this.defaultLimit}
                            meta={this.getMeta}
                            onUpdate={e => this.paginate(e)}
                        />
                    )}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    .serviceModule {
        &__controls {
            margin-bottom: 18px;
        }
    }
</style>
