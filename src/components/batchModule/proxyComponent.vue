<script>
import error from './error';
import loading from './loading';
import path from 'path';

export default {
    name: 'ProxyComponent',

    components: {
        error,
        loading,
    },

    props: {
        componentPath: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
        },
    },

    async mounted() {
        console.log(this.componentPath, '../customTextarea/index', '../customTextarea/index' === this.componentPath);
        this.component = () => import(this.componentPath);
    },

    data() {
        return {
            component: null
        }
    },

    computed: {
        loader() {
            const path = `../customTextarea/index`;
            const newPath = this.componentPath;

            console.log(newPath === path, newPath, path);
            return () => {
                return {
                    component: import(path),
                    loading: loading,
                    error: error,
                    delay: 200,
                    timeout: 6000,
                };
            };
        },
    },

    render() {
        /*const component = this.loader;
        if (component) {
            return <component data={this.data} onUpdate={e => this.$emit('update', e)} />;
        }*/

        if (this.component) {
            const Component = this.component;
            return <Component/>
        }
    },
};
</script>
