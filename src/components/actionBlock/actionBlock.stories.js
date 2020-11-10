import ActionBlock from './index';
import description from './actionBlock.description';
import sourceCode from './actionBlock.sourceCode';
import { action } from '@storybook/addon-actions';

const defaultParams = {
    url: 'https://api.presentation.food.true-false.ru/api/admin/shop/orders/738',
    method: 'put',
    data: {data: 'some data'},
    headers: {'authorization' : 'Bearer [your token]'}
};

const methods = {
    onSuccess: action('success'),
    onError: action('error'),
    onCancel: action('cancel'),
};

export default {
    title: 'UI-Kit/ActionBlock',

    component: ActionBlock,

    argTypes: {
        params: {
            control: { type: 'object' },
            defaultValue: {url: '', method: '', headers: {}, data: {}},
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'url: \'\', method: \'\', headers: {}, data: {}' },
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
    components: { ActionBlock },
    methods: methods,
    template: `
        <action-block @success="this.onSuccess"
                      @error="this.onError"
                      @cancel="this.onCancel"
                      v-bind="$props">
        </action-block>`,
});


/*
* Stories
*/

export const Default = Template.bind({});
Default.args = {
    params: defaultParams,
};



export const Disabled = Template.bind({});
Disabled.args = {
    params: defaultParams,
    disabled: true,
    cancelButtonText: 'Отменить',
    successButtonText: 'Принять',
};

Disabled.parameters = {
    docs: {
        source: {
            code: sourceCode.disabled,
        },
    },
};

const SlotTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { ActionBlock },
    methods: methods,
    template: `
        <action-block @success="this.onSuccess"
                      @error="this.onError"
                      @cancel="this.onCancel"
                      v-bind="$props">
            <div>Минимальная сумма заказа: 4500 руб.</div>
        </action-block>`,
});


export const withSlot = SlotTemplate.bind({});
withSlot.args = {
    params: defaultParams,
    isCancelButtonNeed: false,
};

withSlot.parameters = {
    docs: {
        source: {
            code: sourceCode.withSlot,
        },
    },
};


