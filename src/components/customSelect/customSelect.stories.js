import customSelect from './index';
import description from './customSelect.description';
import sourceCode from './customSelect.sourceCode';
import { action } from '@storybook/addon-actions';

const methods = {
    onInput: action('input'),
    onChange: action('change'),
    onClearError: action('clearError'),
};

export default {
    title: 'UI-Kit/customSelect',

    component: customSelect,

    argTypes: {
        items: {
            control: { type: 'array' },
            defaultValue: [
                { id: 1, value: 'First value' },
                { id: 2, value: 'Second value' },
            ],
            table: {
                type: { summary: 'array' },
                defaultValue: `[{ id: 13, value: 'value1' },{ id: 24, value: 'value2' },]`,
            },
        },

        fields: {
            control: { type: 'object' },
            defaultValue: { id: 'id', value: 'value' },
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'null' },
            },
        },

        defaultSelectedValue: {
            control: { type: 'object' },
            defaultValue: { id: '', value: '' },
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'null' },
            },
        },

        readonly: {
            control: { type: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        selected: {
            control: { type: 'text' },
            defaultValue: '{}',
            table: {
                type: { summary: 'object or array' },
                defaultValue: { summary: '{}' },
            },
        },
        selectedItems: {
            control: { type: 'array' },
            defaultValue: [],
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: '[]' },
            },
        },
        label: {
            control: { type: 'text' },
            defaultValue: '',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },

        updateState: {
            control: { type: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        hideOnSelect: {
            control: { type: 'boolean' },
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        id: {
            control: { type: 'text' },
            defaultValue: 'id',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'id' },
            },
        },
        placeholder: {
            control: { type: 'text' },
            defaultValue: '',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },

        required: {
            control: { type: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },

        selectedField: {
            control: { type: 'text' },
            defaultValue: 'id',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'id' },
            },
        },

        searchCallback: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'function' },
                defaultValue: { summary: null },
            },
        },

        hideSearchIcon: {
            control: { type: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },

        isLocalSearch: {
            control: { type: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },

        searchMethod: {
            control: { type: 'object' },
            defaultValue: {
                url: null,
                field: null,
                nameField: null,
                idField: null,
                searchField: null,
                params: {
                    search: null,
                },
                axios: null,
            },
            table: {
                type: { summary: 'object' },
                defaultValue: {
                    summary: `{ url: null, 
                                field: null,
                                nameField: null,
                                idField: null,
                                searchField: null,
                                params: {
                                    search: null,
                                },
                                axios: null 
                            }`,
                },
            },
        },

        error: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'null' },
            },
        },

        customIcon: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'null' },
            },
        },

        customSearchIcon: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'null' },
            },
        },
    },

    parameters: {
        docs: {
            description: description,
            source: {
                code: sourceCode.default,
            },
        },
    },
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { customSelect },
    data() {
        return {
            currSelected: args.selected,
        };
    },
    methods: {
        ...methods,
        onChange(e) {
            this.currSelected = e;
            methods.onChange(e);
        },
    },
    template: `
        <custom-select @clearError="onClearError"
                       @change="onChange($event)"
                       @input="onInput"
                       v-bind="$props"
                       :selected="this.currSelected"/>`,
});

/*
 * Stories
 */

export const Default = Template.bind({});
Default.args = {
    label: 'Default',
};

Default.parameters = {
    docs: {
        source: {
            code: sourceCode.default,
        },
    },
};

export const Multi = Template.bind({});
Multi.args = {
    label: 'Multi',
    selected: [],
};

Multi.parameters = {
    docs: {
        source: {
            code: sourceCode.multi,
        },
    },
};

const searchTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { customSelect },
    data() {
        return {
            currSelected: args.selected,
            currItems: [],
        };
    },
    methods: {
        ...methods,
        onChange(e) {
            this.currSelected = e;
            methods.onChange(e);
        },
    },
    template: `
        <custom-select @clearError="onClearError"
                       @change="onChange($event)"
                       @input="onInput"
                       v-bind="$props"
                       :selected="this.currSelected"
                       :items="this.currItems"
                       :searchMethod="{ url: 'https://api.presentation.food.true-false.ru/api/public/shop/products',
                                       headers: {},
                                       field: 'items',
                                       nameField: null,
                                       idField: null,
                                       searchField: 'q',
                                       params: {
                                           search: null,
                                       }
                                   }"
                        :fields="{id: 'id', value: 'name'}"
                        :searchCallback="e => currItems = e" />`,
});

export const singleSearch = searchTemplate.bind({});
singleSearch.args = {
    label: 'Single search',
    selected: {},
};

singleSearch.parameters = {
    docs: {
        source: {
            code: sourceCode.singleSearch,
        },
    },
};

export const multiSearch = searchTemplate.bind({});
multiSearch.args = {
    label: 'Multi Search',
    selected: [],
    searchMethod: singleSearch.args.searchMethod,
};

multiSearch.parameters = {
    docs: {
        source: {
            code: sourceCode.multiSearch,
        },
    },
};

export const SingleLocalSearch = Template.bind({});
SingleLocalSearch.args = {
    label: 'Single Local Search',
    isLocalSearch: true,
};

SingleLocalSearch.parameters = {
    docs: {
        source: {
            code: sourceCode.localSearch,
        },
    },
};

export const MultiLocalSearch = Template.bind({});
MultiLocalSearch.args = {
    label: 'Multi Local Search',
    isLocalSearch: true,
    selected: [],
};

MultiLocalSearch.parameters = {
    docs: {
        source: {
            code: sourceCode.localMultiSearch,
        },
    },
};
