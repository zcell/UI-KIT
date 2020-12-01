<script>
    import BatchModule from '@/components/batchModule/index';
    import ActionBlock from '@/components/actionBlock/index';
    import CustomInput from '@/components/customInput/index';
    import CustomTextarea from '@/components/customTextarea/index';
    import CustomSelect from '@/components/customSelect/index';
    import TextEditor from '@/components/textEditor/index';
    import DefaultHeading from '@/components/defaultHeading/index';
    import MainNav from '@/components/mainNav/index';
    import Breadcrumbs from '@/components/breadcrumbs/index';
    import CustomList from '@/components/customList/index';

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
                    {
                        code: 'column-1593499368010',
                        name: 'Количество персон:',
                        formInputCode: 'input',
                        useInEmail: true,
                        type: 'numeric',
                        value: 1,
                    },
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
            CustomList,
            Breadcrumbs,
            DefaultHeading,
            TextEditor,
            CustomTextarea,
            CustomInput,
            CustomSelect,
            MainNav,
            ActionBlock,
            BatchModule,
        },

        data() {
            return {
                inputValue: '',
                batchTabs: [
                    {
                        id: '1',
                        name: 'Test',
                        component: CustomTextarea,
                        listeners: {
                            input: e => (this.inputValue = e),
                            update: null,
                        },
                        props: {
                            value: '11',
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
                            value: '22',
                        },
                    },
                ],
                navItems: [
                    {
                        to: '/',
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
                        to: '/4',
                        text: 'Линк 4',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/5',
                        text: 'Линк 5',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/6',
                        text: 'Линк 6',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/7',
                        text: 'Линк 7',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/8',
                        text: 'Линк 8',
                        icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_frost_freezingbreath.jpg',
                    },
                    {
                        to: '/9',
                        text: 'Линк 9',
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

        render() {
            return (
                <div id="app">
                    <custom-list
                        items={[{ data: 'dataText' }, { data: 'dataText2' }]}
                        list-item-slot={item => <div onClick={() => {item.data = 'testData'; item.onUpdateItem(item)}}>{item.data}</div>}
                        list-item-props={{ showStatus: true, showEdit: true, showDelete: true }}
                        list-item-contents={[
                                {thumb: 'http://localhost:8080/img/logo.82b9c7a5.png'},
                                {label: 'title', value: 'value'},
                                [
                                    {label: 'title2', value: 'value2'},
                                    {label: 'title3', value: 'value3'},
                                ],
                            ]}
                    />

                    <breadcrumbs items={[{ name: 'Не главная', componentName: 'Foo' }]} />
                    <batch-module tabs={this.batchTabs} />
                    <custom-input v-model={this.inputValue} type="date" onFocus={() => this.log('focus')} />

                    <default-heading title="Title" cache-params={{ url: '' }} client-url="https://yandex.ru" />

                    <img alt="Vue logo" src="./assets/logo.png" />
                    <action-block array-params={this.mockAB} onSuccess={e => this.log(e)} onError={e => this.log(e)} />

                    <custom-textarea />

                    <custom-select
                        items={[
                            { id: 1, value: 'First value' },
                            { id: 2, value: 'Second value' },
                        ]}
                    />
                </div>
            );
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
