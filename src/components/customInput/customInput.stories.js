import customInput from './index';
import { action } from '@storybook/addon-actions';
import description from './customInput.description';
import sourceCode from './customInput.sourceCode';

const methods = {
    onInput: action('input'),
    onClearError: action('clearError'),
    onFocus: action('focus'),
    onChange: action('change'),
    onBlur: action('blur'),
    onClick: action('click'),
};

export default {
    title: 'UI-Kit/CustomInput',

    component: customInput,

    argTypes: {
        type: {
            control: { type: 'select', options: ['text', 'tel', 'number'] },
            defaultValue: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' },
            },
        },

        value: {
            control: { type: '' },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: null },
            },
        },

        mask: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'RegExp (only type="tel")' },
                defaultValue: { summary: '' },
            },
        },

        min: {
            control: { type: 'number', min: 0, max: Number.MAX_SAFE_INTEGER, step: 1 },
            defaultValue: null,
            table: {
                type: { summary: 'number (only type="number")' },
                defaultValue: { summary: 0 },
            },
        },

        max: {
            control: { type: 'number', min: 0, max: Number.MAX_SAFE_INTEGER, step: 1 },
            defaultValue: null,
            table: {
                type: { summary: 'number (only type="number")' },
                defaultValue: { summary: Number.MAX_SAFE_INTEGER },
            },
        },

        accept: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'string (only type="tel")' },
                defaultValue: { summary: '' },
            },
        },

        error: {
            control: { type: 'text' },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: null },
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

    components: { customInput },

    methods: methods,

    data() {
        return {
            inputValue: '',
        }
    },

    template: `
        <custom-input v-bind="$props"
                      v-model="inputValue"
                      @input="this.onInput"
                      @clearError="this.onClearError"
                      @focus="this.onFocus"
                      @change="this.onChange"
                      @blur="this.onBlur"
                      @click="this.onClick"
        />`,
});

export const Default = Template.bind({});
Default.args = {
    label: 'Label',
};


/*
* typeNumber
*/
export const typeNumber = Template.bind({});
typeNumber.args = {
    ...Default.args,
    type: 'number',
    min: 0,
    max: 99,
};
typeNumber.parameters = {
    docs: {
        source: {
            code: sourceCode.typeNumber,
        },
    },
};

/*
* typeTel
*/
export const typeTel = Template.bind({});
typeTel.args = {
    ...Default.args,
    type: 'tel',
    mask: '\\+7 (111) 1111-11',
};
typeTel.parameters = {
    docs: {
        source: {
            code: sourceCode.typeTel,
        },
    },
};