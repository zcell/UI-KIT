<template>
    <div>
        <custom-textarea v-model="value" @input="$emit('update')" />
        <button @click="save()">Save</button>
    </div>
</template>

<script>
    import CustomTextarea from '@/components/customTextarea/index';

    export default {
        name: 'test',

        components: { CustomTextarea },

        data() {
            return {
                value: '',
            };
        },

        methods: {
            save() {
                this.$emit('save');
            },
        },
    };
</script>

<style scoped></style>
