import checkbox from './index';
import description from './checkbox.description';
import sourceCode from './checkbox.sourceCode';
import { action } from '@storybook/addon-actions';

const methods = {
    onInput: action('input'),
};

export default {
    title: 'UI-Kit/Checkbox',

    component: checkbox,

    argTypes: {
        type: {
            control: { type: 'select', options: [null, 'roll', 'radio'] },
            defaultValue: null,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
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
    components: { checkbox },
    data() {
        return {
            checked: false,
        };
    },
    methods: methods,
    template: `
        <checkbox @input="this.onInput"
                  v-bind="$props"
                  v-model="checked">
            Lorem ipsum dolor sit amet, elit.
        </checkbox>`,
});


/*
* Stories
*/

export const Default = Template.bind({});

export const Roll = Template.bind({});
Roll.args = {
    type: 'roll',
};


Roll.parameters = {
    docs: {
        source: {
            code: sourceCode.roll,
        },
    },
};

export const Radio = Template.bind({});
Radio.args = {
    type: 'radio',
};

Radio.parameters = {
    docs: {
        source: {
            code: sourceCode.radio,
        },
    },
};