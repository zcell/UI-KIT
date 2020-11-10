import customTextarea from './index';
import description from './customTextarea.description';
import sourceCode from './customTextarea.sourceCode';
import { action } from '@storybook/addon-actions';


const methods = {
    onInput: action('input'),
};

export default {
    title: 'UI-Kit/TextArea',

    component: customTextarea,

    argTypes: {
        error: {
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
    components: { customTextarea },
    methods: methods,
    template: `
        <custom-textarea
                @input="this.onInput"
                v-bind="$props">
            Button
        </custom-textarea>`,
});


/*
* Stories
*/

export const Default = Template.bind({});
Default.args = {
    label: 'Label',
    minHeight: 20,
    maxHeight: 120,
};

export const withPlaceholder = Template.bind({});
withPlaceholder.args = {
    ...Default.args,
    placeholder: 'Placeholder'
};

withPlaceholder.parameters = {
    docs: {
        source: {
            code: sourceCode.withPlaceholder,
        },
    },
};
