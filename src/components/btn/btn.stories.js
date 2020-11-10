import Btn from './btn';
import description from './btn.description'
import sourceCode from './btn.sourceCode'
import { action } from '@storybook/addon-actions';


const methods = {
    onClick: action('click'),
    onClearError: action('clearError'),
    onDblclick: action('dblclick'),
};

export default {
    title: 'UI-Kit/Btn',

    component: Btn,

    argTypes: {
        type: {
            control: { type: 'select', options: [null, 'success', 'danger'] },
            defaultValue: '',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },
        iconPosition: {
            control: { type: 'select', options: ['top', 'bottom', 'first', 'last'] },
            defaultValue: 'last',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'last' },
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
    components: { Btn },
    methods: methods,
    template: `
        <btn @click="this.onClick"
             @clearError="this.onClearError"
             @dblclick="this.onDblclick"
             v-bind="$props">
            Button
        </btn>`,
});


/*
* Stories
*/

export const Default = Template.bind({});
Default.args = {
    type: null,
};

export const typeSuccess = Template.bind({});
typeSuccess.args = {
    type: 'success',
};

typeSuccess.parameters = {
    docs: {
        source: {
            code: sourceCode.typeSuccess,
        },
    },
};

export const typeDanger = Template.bind({});
typeDanger.args = {
    type: 'danger',
};

typeDanger.parameters = {
    docs: {
        source: {
            code: sourceCode.typeDanger,
        },
    },
};


/*
* iconSlot
*/

export const withIcon = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Btn },
    methods: methods,
    template: `
        <btn @click="this.onClick"
             @clearError="this.onClearError"
             @dblclick="this.onDblclick"
             v-bind="$props">
            Button
            <template #icon>
                <img alt="ads via Carbon" style="width:22px; height: 22px;"
                     src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zODMuODQxLDE3MS44MzhjLTcuODgxLTguMzEtMjEuMDItOC42NzYtMjkuMzQzLTAuNzc1TDIyMS45ODcsMjk2LjczMmwtNjMuMjA0LTY0Ljg5Mw0KCQkJYy04LjAwNS04LjIxMy0yMS4xMy04LjM5My0yOS4zNS0wLjM4N2MtOC4yMTMsNy45OTgtOC4zODYsMjEuMTM3LTAuMzg4LDI5LjM1bDc3LjQ5Miw3OS41NjENCgkJCWM0LjA2MSw0LjE3Miw5LjQ1OCw2LjI3NSwxNC44NjksNi4yNzVjNS4xMzQsMCwxMC4yNjgtMS44OTYsMTQuMjg4LTUuNjk0bDE0Ny4zNzMtMTM5Ljc2Mg0KCQkJQzM5MS4zODMsMTkzLjI5NCwzOTEuNzM1LDE4MC4xNTUsMzgzLjg0MSwxNzEuODM4eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjU2LDBDMTE0Ljg0LDAsMCwxMTQuODQsMCwyNTZzMTE0Ljg0LDI1NiwyNTYsMjU2czI1Ni0xMTQuODQsMjU2LTI1NlMzOTcuMTYsMCwyNTYsMHogTTI1Niw0NzAuNDg3DQoJCQljLTExOC4yNjUsMC0yMTQuNDg3LTk2LjIxNC0yMTQuNDg3LTIxNC40ODdjMC0xMTguMjY1LDk2LjIyMS0yMTQuNDg3LDIxNC40ODctMjE0LjQ4N2MxMTguMjcyLDAsMjE0LjQ4Nyw5Ni4yMjEsMjE0LjQ4NywyMTQuNDg3DQoJCQlDNDcwLjQ4NywzNzQuMjcyLDM3NC4yNzIsNDcwLjQ4NywyNTYsNDcwLjQ4N3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="/>
            </template>
        </btn>`,
});

withIcon.args = {
    iconPosition: 'first',
    type: '',
};

withIcon.parameters = {
    docs: {
        source: {
            code: sourceCode.withIcon,
        },
    },
};
