<script>
    export default {
        name: 'Breadcrumbs',

        props: {
            items: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        render() {
            return (
                <div class="breadcrumbs">
                    <div class="breadcrumbs__container">
                        <ul class="breadcrumbs__nav" itemscope="" itemtype="http://schema.org/BreadcrumbList">
                            <li class="breadcrumbs__item" itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
                                <meta itemProp="position" content="0" />

                                <router-link class="breadcrumbs__link" itemprop="item" to={{ name: 'index' }}>
                                    Главная
                                </router-link>
                            </li>

                            {this.items.map((item, index) => {
                                return (
                                    <li class="breadcrumbs__item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
                                        <meta itemprop="position" content={`${index + 1}`} />

                                        <router-link
                                            class="breadcrumbs__link"
                                            itemprop="item"
                                            to={{
                                                name: item.componentName,
                                                params: item.params,
                                                query: item.query,
                                                hash: item.hash ? item.hash : '',
                                            }}>
                                            <span itemprop="name">{item.name}</span>
                                        </router-link>
                                    </li>
                                );
                            })}
                            <a class="breadcrumbs__back" href={{ javascript: void 0 }} onClick={() => this.$router.go(-1)}>
                                Назад
                            </a>
                        </ul>
                    </div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .breadcrumbs {
        &__container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
        }

        &__nav {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            padding: 0;
            margin: 0;

            list-style: none;
            font-family: $FontFamily;
        }

        &__link {
            font-size: 12px;
            cursor: pointer;

            color: $additionalText;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            span {
                white-space: nowrap;
            }
        }

        &__item {
            position: relative;
            padding: 0;

            &:after {
                content: '–';
                margin: 0 7px;

                color: $additionalText;
                font-size: 13px;
            }

            &:nth-last-child(2) {
                .breadcrumbs__link {
                    cursor: default;
                    color: $additionalText;
                    pointer-events: none;
                }

                &:after {
                    display: none;
                }
            }
        }

        &__back {
            display: none;
        }
    }
</style>
