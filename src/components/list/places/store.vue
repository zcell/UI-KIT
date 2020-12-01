<script>
    import listItem from './listItem';

    export default {
        name: 'store',

        mixins: [listItem],

        computed: {
            isProductPage() {
                return this.curItem?.slug?.split('-')?.[0] === 'products';
            },

            isLandingPage() {
                return this.curItem?.slug?.split('-')?.[0] === 'landings';
            },
            getPrice() {
                if (this.curItem) {
                    if (this.curItem.maxPrice && this.curItem.minPrice) {
                        return this.curItem.maxPrice === this.curItem.minPrice
                            ? this.curItem.minPrice + ' ₽'
                            : this.curItem.minPrice + ' - ' + this.curItem.maxPrice + ' ₽';
                    }
                }
            },

            offers() {
                if (this.curItem && Array.isArray(this.curItem.offers)) {
                    return 'Кол-во предложений: ' + this.curItem.offers.length;
                }
            },
        },

        render() {
            return (
                <li class="customListItem storeItem">
                    {this.getContextMenu()}

                    {this.isProductPage && (
                        <div class="storeItem__thumbWrapper">
                            <div class="customListItem__thumb">
                              </div>

                            {this.curItem.name && (
                                <div class="customListItem__info">
                                    <p class="customListItem__text">{this.curItem.name}</p>
                                </div>
                            )}

                            {this.curItem.category && (
                                <div class="customListItem__category">
                                    <p class="customListItem__text">{this.curItem.category.name}</p>
                                </div>
                            )}

                            {![null, undefined, ''].includes(this.curItem.quantity) && (
                                <custom-input v-model={this.curItem.quantity} onInput={() => this.change()} />
                            )}

                            <div class="storeItem__price">
                                <div class="categoriesItem__priceValue">{this.getPrice}</div>
                                <div class="categoriesItem__priceOffers">{this.offers}</div>
                            </div>
                        </div>
                    )}

                    {!this.isProductPage && (
                        <div class="storeItem__nameWrapper">
                            {this.curItem.name && (
                                <div class="customListItem__name">
                                    <p class="storeItem__text">{this.curItem.name}</p>
                                </div>
                            )}

                            {Array.isArray(this.curItem.sets) && this.curItem.sets.length > 0 && (
                                <div class="storeItem__setsWrapper">
                                    <p class="storeItem__setsName">Сеты:</p>
                                    <ul class="storeItem__sets">
                                        {this.curItem.sets.map((set, index) => {
                                            return (
                                                <li class="storeItem__set">
                                                    {set.name}
                                                    {index !== this.curItem.sets.length - 1 ? ',' : ''}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {this.curItem.category && this.isLandingPage && (
                                <div class="customListItem__category--landing">
                                    <p class="customListItem__text">{this.curItem.category.name}</p>
                                </div>
                            )}

                            {this.curItem.startsAt && (
                                <div class="customListItem__name storeItem__name">
                                    <p class="customListItem__text">Дата старта: {this.curItem.startsAt}</p>
                                </div>
                            )}

                            {this.curItem.endsAt && (
                                <div class="customListItem__name storeItem__name">
                                    <p class="customListItem__text">Дата окончания: {this.curItem.endsAt}</p>
                                </div>
                            )}

                            {typeof this.curItem.priority !== 'undefined' && (
                                <div class="customListItem__name storeItem__name">
                                    <p class="customListItem__text">Приоритет: {this.curItem.priority}</p>
                                </div>
                            )}

                            {typeof this.curItem.sortOrder !== 'undefined' && (
                                <div class="customListItem__name storeItem__name">
                                    <p class="customListItem__text">Индекс сортировки: {this.curItem.sortOrder}</p>
                                </div>
                            )}

                            {![null, undefined, ''].includes(this.curItem.productCount) && typeof this.curItem.productCount === 'number' && (
                                <div class="customListItem__count storeItem__count storeItem__count--marginLeft">
                                    <a
                                        class={`customListItem__text ${this.curItem.productCount === 0 ? 'storeItem__defaultCursor' : ''}`}
                                        href={
                                            this.curItem.productCount !== 0
                                                ? `/store?search=category_name&text=${this.curItem.name}&offset=0#products`
                                                : 'javascript:void(0)'
                                        }
                                        target={this.curItem.productCount !== 0 ? `_blank` : `_self`}>
                                        Товары ({this.curItem.productCount})
                                    </a>
                                </div>
                            )}

                            {![null, undefined, ''].includes(this.curItem.landingCount) && typeof this.curItem.landingCount === 'number' && (
                                <div class="customListItem__count storeItem__count">
                                    <a
                                        class={`customListItem__text ${this.curItem.landingCount === 0 ? 'storeItem__defaultCursor' : ''}`}
                                        href={
                                            this.curItem.landingCount !== 0
                                                ? `/store?search=category_name&text=${this.curItem.name}&offset=0#landings`
                                                : 'javascript:void(0)'
                                        }
                                        target={this.curItem.landingCount !== 0 ? `_blank` : `_self`}>
                                        Лэндинги ({this.curItem.landingCount})
                                    </a>
                                </div>
                            )}

                            <div class="customListItem__price storeItem__price">
                                <div class="customListItem__priceValue">{this.getPrice}</div>
                                <div class="customListItem__priceOffers">{this.offers}</div>
                            </div>
                        </div>
                    )}

                    {this.$route.name !== 'pages-slug' && this.$route.name !== 'bundles-slug' && (
                        <checkbox
                            class="checkbox--roll customListItem__checkbox"
                            type="checkbox"
                            disabled={(this.curItem.isWritePermissionAllowed ? this.curItem.isWritePermissionAllowed : false) || this.curItem.isHome}
                            v-model={this.status}
                            onInput={() => this.changeStatus(this.curItem)}
                        />
                    )}

                    {![null, undefined].includes(this.curItem.quantity) && (
                        <custom-input
                            type="number"
                            label={this.isFixedBundle ? 'Количество в наборе' : 'Выбрано по умолчанию'}
                            value={this.curItem.quantity}
                            v-model={this.curItem.quantity}
                            onFocusout={e => this.testM(e)}
                            onInput={e => {
                                this.$emit('updateItemQuantity', e);
                                this.change();
                            }}
                            class="storeItem__input"
                        />
                    )}

                    {![null, undefined, ''].includes(this.curItem.sortOrder) && this.orderList.length > 0 && (
                        <custom-select
                            label="Позиция"
                            selected={this.curItem.position}
                            items={this.orderList}
                            onChange={e => {
                                this.$emit('updatePosition', e);
                                this.change();
                            }}
                            class="sets__listItemSelect storeItem__select"
                        />
                    )}

                    {this.$route.name !== 'pages-slug' && this.$route.hash !== '#couponBatches' && this.$route.name !== 'bundles-slug' && (
                        <edit-btn
                            class="storeItem__edit"
                            onClick={() =>
                                this.$router.push({
                                    name: this.$route.name + '-slug',
                                    params: { slug: this.curItem.slug },
                                })
                            }
                        />
                    )}

                    {!(this.$route.name !== 'pages-slug' && this.$route.hash !== '#couponBatches' && this.$route.name !== 'bundles-slug') &&
                        this.$route.hash === '#couponBatches' &&
                        this.$route.name !== 'bundles-slug' && (
                            <edit-btn
                                class="storeItem__edit"
                                onClick={() => {
                                    this.$emit('callback', { id: this.curItem.id, methodName: 'batches' });
                                    this.change();
                                }}
                            />
                        )}
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .storeItem {
        &__thumbWrapper {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-right: 50px;
        }

        &__nameWrapper {
            width: 100%;
            display: flex;
            align-items: center;
        }

        &__name {
            max-width: 210px;
        }

        &__setsWrapper {
            width: 350px;
        }

        &__setsName {
            margin-right: 5px;
            font-weight: 700;
        }

        &__sets {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            margin-right: 35px;
        }

        &__set {
            margin: 0 2px;
        }

        &__name {
            margin: 0 20px;
        }

        &__input {
            max-width: 140px;
            margin-right: 20px;
        }

        &__select {
            max-width: 100px;
        }

        &__defaultCursor.storeItem__text {
            cursor: default;
        }

        &__count {
            @include below($md-desktop) {
                margin-right: 30px;
            }

            &--marginLeft {
                margin-left: auto;
            }
        }

        &__price {
            flex-wrap: wrap;
            min-width: 220px;
            margin-right: 15px;

            &:last-child {
                min-width: auto;
            }
        }
    }
</style>
