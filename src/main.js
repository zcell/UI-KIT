import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/bar', name: 'foo' },
];

const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: 'abstract',
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
