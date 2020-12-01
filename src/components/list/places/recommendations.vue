<script>
    import listItem from './listItem';
    export default {
        name: 'recommendations',

        mixins: [listItem],

        computed: {
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
                <li class="customListItem categoriesItem">
                    {this.getContextMenu()}

                    {this.curItem.thumb && (
                        <div class="customListItem__thumb">
                            <img src={this.curItem.thumb} alt={this.curItem.name ? this.curItem.name : ''} />
                        </div>
                    )}

                    {this.curItem.name && (
                        <div class="customListItem__name">
                            <p class="customListItem__text">{this.curItem.name}</p>
                        </div>
                    )}

                    {(this.curItem.category || {}).name && (
                        <div class="customListItem__name">
                            <p class="customListItem__text">{this.curItem.category.name}</p>
                        </div>
                    )}

                    {this.getPrice && (
                        <div class="customListItem__price">
                            <div class="customListItem__priceValue">{this.getPrice}</div>
                            <div class="customListItem__priceOffers categoriesItem__priceOffers">{this.offers}</div>
                        </div>
                    )}
                </li>
            );
        },
    };
</script>
