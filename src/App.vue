<template>
    <div id="app">
        <batch-module :tabs="batchTabs" />
        <custom-input v-model="inputValue" @focus="log('focus')" />

        <default-heading :title="'Title'" :is-clear-cache="true" client-url="123" />

        <main-nav :items="navItems">
            <template #logo>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 29">
                    <path
                        d="M4.68 13.19V3.2H.75V0h11.48v3.2H8.3v9.99H4.68zm9.14 0V0h6.19c1.9 0 3.33.47 4.26 1.41a4.24 4.24 0 011.16 3.13c0 1.94-.9 3.29-2.69 4.05l3.12 4.6h-4.19l-2.63-4h-1.6v4h-3.62zm3.63-6.86h2.4c.6 0 1.08-.14 1.41-.41.35-.3.53-.69.53-1.2 0-.5-.18-.9-.53-1.16-.33-.26-.81-.4-1.44-.4h-2.37v3.17zm15.7 7.1c-1.92 0-3.41-.5-4.47-1.5-1.06-1-1.59-2.52-1.59-4.53V0h3.68v7.33c0 .93.22 1.63.64 2.1.44.47 1.03.7 1.78.7s1.33-.22 1.75-.67c.44-.45.66-1.13.66-2.04V0h3.68v7.31c0 2.06-.54 3.6-1.63 4.62-1.07 1-2.57 1.5-4.5 1.5zm8.28-.24V0h10.52v3.1h-6.93v2h6.28V8h-6.28v2.09h7.03v3.1H41.43zM2.29 27.99V16.63h8.53v1.19H3.63v4.05h6.43v1.17H3.63V28H2.3zm20.75-1.53a5.9 5.9 0 01-4.36 1.72 5.83 5.83 0 01-6.03-5.87c0-1.61.57-2.99 1.71-4.13a5.86 5.86 0 014.36-1.74 5.83 5.83 0 016.04 5.87c0 1.61-.58 3-1.72 4.15zm-7.68-.82c.9.9 2.01 1.36 3.36 1.36 1.34 0 2.45-.45 3.32-1.35a4.61 4.61 0 001.32-3.34c0-1.3-.44-2.42-1.34-3.32-.88-.91-2-1.37-3.34-1.37a4.59 4.59 0 00-4.65 4.69c0 1.3.45 2.42 1.33 3.33zm22.09.82a5.9 5.9 0 01-4.36 1.72 5.83 5.83 0 01-6.04-5.87c0-1.61.58-2.99 1.72-4.13a5.86 5.86 0 014.36-1.74 5.83 5.83 0 016.03 5.87c0 1.61-.57 3-1.71 4.15zm-7.68-.82c.9.9 2.01 1.36 3.36 1.36 1.34 0 2.45-.45 3.32-1.35a4.61 4.61 0 001.32-3.34c0-1.3-.45-2.42-1.34-3.32-.88-.91-2-1.37-3.34-1.37a4.59 4.59 0 00-4.65 4.69c0 1.3.44 2.42 1.33 3.33zm12.22 2.35V16.63h4.12c1.85 0 3.37.54 4.54 1.63a5.25 5.25 0 011.77 4.05c0 1.62-.6 2.97-1.78 4.06a6.43 6.43 0 01-4.53 1.62h-4.12zm1.34-1.19h2.78c1.48 0 2.67-.42 3.56-1.26a4.25 4.25 0 001.36-3.23c0-1.29-.46-2.36-1.36-3.21a4.97 4.97 0 00-3.56-1.28h-2.78v8.98z"
                    />
                </svg>
            </template>

            <template #moreBtn>НеЕще ➜</template>

            Default
        </main-nav>

        <img alt="Vue logo" src="./assets/logo.png" />
        <action-block :array-params="mockAB" @success="log($event)" @error="log($event)" />

        <custom-textarea />

        <custom-select
            :items="[
                { id: 1, value: 'First value' },
                { id: 2, value: 'Second value' },
            ]"
        />
    </div>
</template>

<script>
    import BatchModule from '@/components/batchModule/index';
    import ActionBlock from '@/components/actionBlock/index';
    import CustomInput from '@/components/customInput/index';
    import CustomTextarea from '@/components/customTextarea/index';
    import CustomSelect from '@/components/customSelect/index';
    import TextEditor from '@/components/textEditor/index';
    import DefaultHeading from '@/components/defaultHeading/index';
    import MainNav from '@/components/mainNav/index';
    import Test from '@/components/test';

    const defaultParams = {
        url: 'https://api.presentation.food.true-false.ru/api/admin/shop/orders/738',
        method: 'put',
        data: {
            id: 738,
            name: 'Михаил',
            customer: {
                id: 99,
                name: 'Михаил',
                email: 'meichtor@gmail.com',
                phone: '79022485761',
                fields: [
                    { code: 'column-1593498960565', name: 'Имя:', formInputCode: 'input', useInEmail: true, type: 'string', value: 'Михаил' },
                    {
                        code: 'column-1593499299863',
                        name: 'Телефон:',
                        formInputCode: 'input',
                        useInEmail: true,
                        type: 'string',
                        value: '79022485761',
                    },
                    {
                        code: 'column-1593499335741',
                        name: 'Email:',
                        formInputCode: 'input',
                        useInEmail: true,
                        type: 'string',
                        value: 'meichtor@gmail.com',
                    },
                    { code: 'column-1593499368010', name: 'Количество персон:', formInputCode: 'input', useInEmail: true, type: 'numeric', value: 1 },
                ],
                address: null,
                orderCount: 51,
            },
            persons: 1,
            delivery: {
                method: {
                    id: 1,
                    name: 'Доставка',
                    fields: [
                        { code: 'column-1593668497373', name: 'Адрес', formInputCode: 'select', useInEmail: true, type: 'string', value: null },
                        { code: 'column-1593668535523', name: 'Подъезд', formInputCode: 'input', useInEmail: true, type: 'string', value: null },
                        { code: 'column-1593668543188', name: 'Этаж', formInputCode: 'input', useInEmail: true, type: 'string', value: null },
                        { code: 'column-1593668578625', name: 'Кв/Офис', formInputCode: 'input', useInEmail: true, type: 'string', value: null },
                        { code: 'column-1601372313035', name: 'Дата', formInputCode: 'input', useInEmail: true, type: 'string', value: null },
                        {
                            code: 'column-1593668596028',
                            name: 'Комментарий к заказу',
                            formInputCode: 'textarea',
                            useInEmail: true,
                            type: 'string',
                            value: null,
                        },
                        {
                            code: 'column-1603804718579',
                            name: 'Время доставки',
                            formInputCode: 'input',
                            useInEmail: true,
                            type: 'string',
                            value: '20:41',
                        },
                    ],
                    price: null,
                    deliveryArea: null,
                    pickupPoint: null,
                },
                comment: null,
            },
            payment: {
                method: {
                    id: 1,
                    successfulOrderStatus: null,
                    failedOrderStatus: null,
                    name: 'Оплата наличными',
                    isOnline: false,
                    redirectUrlRule: null,
                    paymentHandler: null,
                    fields: [],
                },
            },
            coupon: null,
            status: { id: 1, name: 'Новый заказ', isInitial: true, isHeld: false, isOver: false, isDropped: false, value: 'Новый заказ' },
            productList: [
                {
                    thumb: 'https://api.presentation.food.true-false.ru/storage/images/cache/cart_orderservice/738/75569a95-w150_resize.jpg',
                    thumb2x: 'https://api.presentation.food.true-false.ru/storage/images/cache/cart_orderservice/738/75569a95-w300_resize.jpg',
                    additionalInfo: {
                        ingredientList: [
                            {
                                offerId: 386,
                                name: 'Сыр',
                                image: 'shop_product/353/20d9f6e7.jpg',
                                price: 20,
                                special: null,
                                quantity: 0,
                                totalPrice: 0,
                                requiredQuantity: 0,
                            },
                            {
                                offerId: 387,
                                name: 'Халапеньо',
                                image: 'shop_product/354/f8735107.jpg',
                                price: 13,
                                special: null,
                                quantity: 0,
                                totalPrice: 0,
                                requiredQuantity: 0,
                            },
                            {
                                offerId: 388,
                                name: 'Пепперони',
                                image: 'shop_product/355/d5c40511.png',
                                price: 25,
                                special: null,
                                quantity: 0,
                                totalPrice: 0,
                                requiredQuantity: 0,
                            },
                        ],
                        product: {
                            id: 340,
                            name: 'Пицца Мексиканская',
                            category: { id: 163, name: 'Пицца' },
                            attributes: [
                                { id: 12, name: 'Вес', value: { id: 900, value: '960 гр' }, group: { id: 19, name: 'Пищевая ценность' } },
                                { id: 24, name: 'Особенности пиццы', value: { id: 76, value: 'Острая' }, group: { id: 21, name: 'Особенности' } },
                            ],
                            options: [
                                { id: 85, name: 'Тип теста', value: { id: 91, value: 'Традиционное' } },
                                { id: 86, name: 'Размер теста, см', value: { id: 93, value: '25' } },
                            ],
                            offer: { id: 368, purchasePrice: null },
                        },
                    },
                    id: 368,
                    name: 'Пицца Мексиканская',
                    code: '6',
                    image: {
                        image: 'cart_orderservice/738/75569a95.jpg',
                        width: 1564,
                        height: 872,
                        thumbs: [
                            {
                                type: 'resize',
                                thumb: 'cache/cart_orderservice/738/75569a95-origin_resize.jpg',
                                thumb2x: 'cache/cart_orderservice/738/75569a95-origin_resize.jpg',
                                width: null,
                                height: null,
                                realWidth: 1564,
                                realHeight: 872,
                                createdAt: '2020-11-06T06:36:47.000000Z',
                                updatedAt: '2020-11-06T06:36:47.000000Z',
                            },
                            {
                                type: 'fit',
                                thumb: 'cache/cart_orderservice/738/75569a95-origin_fit.jpg',
                                thumb2x: 'cache/cart_orderservice/738/75569a95-origin_fit.jpg',
                                width: null,
                                height: null,
                                realWidth: 1564,
                                realHeight: 872,
                                createdAt: '2020-11-06T06:36:47.000000Z',
                                updatedAt: '2020-11-06T06:36:47.000000Z',
                            },
                        ],
                    },
                    quantity: 1,
                    initialPrice: 439,
                    price: 439,
                    specialPrice: null,
                    actualPrice: 439,
                    purchasePrice: null,
                    totalPrice: 439,
                    product: {
                        id: 340,
                        name: 'Пицца Мексиканская',
                        category: { id: 163, name: 'Пицца' },
                        attributes: [
                            { id: 12, name: 'Вес', value: { id: 900, value: '960 гр' }, group: { id: 19, name: 'Пищевая ценность' } },
                            { id: 24, name: 'Особенности пиццы', value: { id: 76, value: 'Острая' }, group: { id: 21, name: 'Особенности' } },
                        ],
                        options: [
                            { id: 85, name: 'Тип теста', value: { id: 91, value: 'Традиционное' } },
                            { id: 86, name: 'Размер теста, см', value: { id: 93, value: '25' } },
                        ],
                        offer: { id: 368, purchasePrice: null },
                    },
                    sortOrder: 0,
                    createdAt: '2020-11-06 09:36:47',
                    updatedAt: '2020-11-06 09:36:47',
                    isEdit: false,
                },
            ],
            totals: [
                {
                    id: 760,
                    code: 'product_total_price',
                    title: 'Стоимость товаров',
                    value: 439,
                    status: true,
                    createdAt: '2020-11-06 09:36:47',
                    updatedAt: '2020-11-10 15:11:10',
                },
            ],
            other: { secondName: null, deliveryDate: null },
        },
        headers: {
            authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5wcmVzZW50YXRpb24uZm9vZC50cnVlLWZhbHNlLnJ1L2FwaS9hZG1pbi9sb2dpbiIsImlhdCI6MTYwNTEwMTIzNywiZXhwIjoxNjQxMzg5MjM3LCJuYmYiOjE2MDUxMDEyMzcsImp0aSI6Ik9kcTRYVTVldHUzV1lFWVYiLCJzdWIiOjE5LCJwcnYiOiJmOTY2ZWYxNTk5OGFjYWYwYjJhOTlhMDc2Njg4Mjk4NDM3YWE0ZjZhIn0.0682RP2bNR04Uowthd9RHi2RQj-GhSoPzVrHl5QlyY4',
        },
    };

    export default {
        name: 'App',

        components: {
            DefaultHeading,
            TextEditor,
            CustomTextarea,
            CustomInput,
            CustomSelect,
            MainNav,
            ActionBlock,
            BatchModule,
            Test
        },

        data() {
            return {
                inputValue: '',
                batchTabs: [
                    {
                        id: '1',
                        name: 'Test',
                        component: Test,
                        listeners: {
                            input: e => (this.inputValue = e),
                            update: null,
                        },
                        props: {
                            value: '11'
                        },
                    },

                    {
                        id: '2',
                        name: 'testName',
                        component: CustomTextarea,
                        listeners: {
                            input: e => (this.inputValue = e),
                        },
                        props: {
                            value: '22'
                        },
                    },
                ],
                navItems: [
                    {
                        to: '',
                        text: 'Линк 1',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/2',
                        text: 'Линк 2',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/3',
                        text: 'Линк 3',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                ],
                mockAB: [
                    {
                        ...defaultParams,
                        order: 1,
                    },
                    {
                        ...defaultParams,
                        order: 0,
                    },
                    {
                        ...defaultParams,
                        order: 0,
                    },
                    {
                        ...defaultParams,
                        order: 2,
                    },
                ],
            };
        },

        methods: {
            log(e) {
                console.log(e);
            },
        },
    };
</script>

<style>
    #app {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    body {
        padding: 0;
        margin: 0;
        font-family: Tahoma, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
