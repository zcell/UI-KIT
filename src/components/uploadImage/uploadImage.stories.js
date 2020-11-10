import uploadImage from './index';
import description from './uploadImage.description';
import sourceCode from './uploadImage.sourceCode';
import { action } from '@storybook/addon-actions';

const methods = {
    onUpdate: action('update'),
};

export default {
    title: 'UI-Kit/UploadImage',

    component: uploadImage,

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
    components: { uploadImage },
    data() {
        return {
            currentFile: {},
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
        <upload-image
                @update="this.onUpdate"
                url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempImage"
                v-bind="$props"
                :image="currentFile"
                :headers="{
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
                }">
        </upload-image>`,
});


/*
* Stories
*/

export const Default = Template.bind({});
Default.args = {
    label: 'Label',
};


/*
* Multiple
* */

const MultipleTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { uploadImage },
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
        <upload-image
                @update="this.onUpdate"
                url="https://api.stage.food.true-false.ru/api/admin/common/uploadTempImage"
                v-bind="$props"
                :images="currentFile"
                :headers="{
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnZS5mb29kLnRydWUtZmFsc2UucnUvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNjA0NjUyNjY5LCJleHAiOjE2NDA5NDA2NjksIm5iZiI6MTYwNDY1MjY2OSwianRpIjoiQzliYkwwQUcwZFZYbHV5MyIsInN1YiI6MTksInBydiI6ImY5NjZlZjE1OTk4YWNhZjBiMmE5OWEwNzY2ODgyOTg0MzdhYTRmNmEifQ.QA8yajtPr_g3LyzkGGY_2YR3ftZ9Uc9GfYoYV7TzNlc',
                }">
        </upload-image>`,
});


export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
    label: 'Multiple',
};
