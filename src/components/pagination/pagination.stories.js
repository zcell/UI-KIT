import Pagination from './index';
import description from './pagination.description';
import sourceCode from './pagination.sourceCode';
import { action } from '@storybook/addon-actions';

const methods = {
    onUpdate: action('update'),
};

export default {
    title: 'UI-Kit/Pagination',

    component: Pagination,

    argTypes: {
        meta: {
            control: { type: 'object' },
            defaultValue: { limit: 0, offset: 0, total: 0 },
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "limit: 0, offset: 0, total: 0" },
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
    components: { Pagination },
    methods: methods,
    template: `
        <pagination 
                @update="this.onUpdate"
                v-bind="$props" />`,
});

/*
 * Stories
 */

export const Default = Template.bind({});
Default.args = {
    meta: {total: 24, limit: 12, offset: 0},
    defaultLimit: 12,
};
