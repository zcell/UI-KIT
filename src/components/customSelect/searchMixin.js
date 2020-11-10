import debounce from 'lodash.debounce';
import { getQueryParamsFromObject } from './helper';

export default {
    props: {
        searchMethod: {
            type: Object,

            default() {
                return {
                    url: null,
                    field: null,
                    nameField: null,
                    idField: null,
                    searchField: null,
                    params: {
                        search: null,
                    },
                    axios: null,
                };
            },
        },

        searchCallback: {
            default() {
                return null;
            },
        },

        hideSearchIcon: {
            type: Boolean,
            default: false,
        },

        isLocalSearch: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            debouncedFind: debounce(this.asyncFind, 300),
        };
    },

    methods: {
        async fetchMethod(e) {
            const searchMethod = JSON.parse(JSON.stringify(this.searchMethod));
            const headers = searchMethod.headers || {};

            let query = '';
            if (searchMethod.params) {
                searchMethod.params[searchMethod.searchField || 'text'] = e;

                query = getQueryParamsFromObject(searchMethod.params);
            }

            const url = `${searchMethod.url || ''}${typeof query === 'string' && query ? query : ''}`;

            const response = await fetch(url, { headers: headers}).catch(err => console.log(err));

            return response.json();
        },

        async asyncFind(e) {
            let searchMethod = this.searchMethod;

            if (searchMethod && searchMethod.url) {
                searchMethod = JSON.parse(JSON.stringify(searchMethod));

                const list = await this.fetchMethod(e);

                if (Array.isArray((list || {})[searchMethod.field]) && this.readonly === false) {
                    const values = list[searchMethod.field];

                    //если структура [this.fields.value || this.fields.id] сложная то пишем свой маппинг инче просто перезапиываем поисковые поля
                    this.currItems =
                        typeof this.searchCallback === 'function'
                            ? this.searchCallback(values)
                            : values.map(item => {
                                  return {
                                      ...item,
                                      [this.fields.value]: item[searchMethod.nameField],
                                      [this.fields.id]: item[searchMethod.idField],
                                  };
                              });
                }
            }
        },

        onInput(e) {
            this.isOpen = true;
            this.$emit('input', e);

            if (this.isSearch) {
                if (this.isLocalSearch) {
                    this.currItems = this.items.filter(item => item[this.fields.value].toLowerCase().includes(e.toLowerCase()));
                } else {
                    if (this.activeItemIndex !== 0) {
                        this.activeItemIndex = 0;
                    }
                    this.debouncedFind(e);
                }
            }
        },
    },
};
