import uploadFile from './index';
import description from './uploadFile.description';
import sourceCode from './uploadFile.sourceCode';
import { action } from '@storybook/addon-actions';

const methods = {
    onUpdate: action('update'),
};

export default {
    title: 'UI-Kit/UploadFile',

    component: uploadFile,

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
    components: { uploadFile },
    data() {
        return {
            currentFile: null,
        };
    },
    methods: {
        ...methods,
        onUpdate(e) {
            this.currentFile = e;
            methods.onUpdate(e);
        },
    },
    template: `
        <upload-file
                @update="this.onUpdate"
                url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempDoc"
                v-bind="$props"
                :file="currentFile"
                :headers="{
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
                }">
            Выберите файл или перетащите его в выделенную область
            <template #button>
                Выбрать файл
            </template>
        </upload-file>`,
});


/*
* Stories
*/

export const Default = Template.bind({});
Default.args = {
    label: 'Label',
};


const TemplateMultiple = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { uploadFile },
    data() {
        return {
            currentFile: [],
        };
    },
    methods: {
        ...methods,
        onUpdate(e) {
            this.currentFile = e;
            methods.onUpdate(e);
        },
    },
    template: `
        <upload-file
                @update="this.onUpdate"
                url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempDoc"
                v-bind="$props"
                :files="currentFile"
                :headers="{
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
                }">
            Выберите файлы или перетащите их в выделенную область
            <template #button>
                Добавить файлы
            </template>
        </upload-file>`,
});

export const Multiple = TemplateMultiple.bind({});
Multiple.args = {
    label: 'Multiple',
    multiple: true,
};

Multiple.parameters = {
    docs: {
        source: {
            code: sourceCode.multiple,
        },
    },
};