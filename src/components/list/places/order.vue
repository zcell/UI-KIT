<script>
    import listItem from './listItem';

    export default {
        name: 'order',

        mixins: [listItem],

        computed: {
            statusModifier() {
                if (this.curItem.status) {
                    if (this.curItem.status.isDropped) {
                        return 'dropped';
                    }

                    if (this.curItem.status.isHeld) {
                        return 'held';
                    }

                    if (this.curItem.status.isInitial) {
                        return 'initial';
                    }

                    if (this.curItem.status.isOver) {
                        return 'over';
                    }

                    return 'etc';
                }
            },
        },

        render() {
            return (
                <li class="customListItem orderItem">
                    {this.getContextMenu()}

                    <div class="orderItem__data">
                        {(this.curItem || {}).id && (
                            <p class="customListItem__text">
                                № {this.curItem.id}
                                <br />
                                {(this.curItem || {}).createdAt && `${this.curItem.createdAt}`}
                            </p>
                        )}
                    </div>

                    <div class="customListItem__user">
                        {(this.curItem || {}).customer && (
                            <p class="customListItem__text">
                                <span class="orderItem__textTag">Имя:</span> {this.curItem?.name || ''}
                                <br />
                                <span class="orderItem__textTag">Телефон:</span> {this.curItem.customer.phone || ''}
                                <br />
                                <span class="orderItem__textTag">Email:</span> {this.curItem.customer.email || ''}
                            </p>
                        )}
                    </div>

                    <div class="orderItem__payment">
                        {this.curItem?.totalPrice?.name && <p class="orderItem__price">{this.curItem.totalPrice} ₽</p>}

                        <svg-icon name="arrow" class="orderItem__payIcon" />

                        {this.curItem?.paymentMethod?.name && <p class="customListItem__text">{this.curItem.paymentMethod.name}</p>}
                    </div>

                    <status class="orderItem__status" modifier={this.statusModifier}>
                        {this.curItem?.status?.name}
                    </status>

                    <edit-btn
                        class="orderItem__edit"
                        onClick={() =>
                            this.$router.push({
                                name: 'order-slug',
                                params: { slug: 'order-' + this.curItem.id },
                            })
                        }
                    />
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .orderItem {
        justify-content: flex-start;
        padding: 25px 30px;

        &__data {
            max-width: 200px;
            width: 100%;
            margin-right: 100px;
        }

        &__textTag {
            font-weight: 700;
        }

        &__userStatus {
            margin-right: 30px;
        }

        &__payment {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: auto;
            max-width: 250px;
            width: 100%;
            margin-right: 25px;
        }

        &__payIcon {
            width: 16px;
            height: 10px;
            margin: 0 14px;

            fill: #cac9ca;
        }

        &__price {
            font-size: 22px;
            font-weight: 400;
            color: #3d4248;
        }

        &__status {
            margin-right: 25px;
        }
    }
</style>
