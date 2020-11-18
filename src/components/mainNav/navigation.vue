<script>
import NavItem from './navItem';
import debounce from 'lodash.debounce';

export default {
    name: 'Navigation',

    components: {
        NavItem,
    },

    props: {
        items: {
            type: Array,
            required: true,
        },

        params: {
            type: Object,
            default() {
                return {};
            },
        },

        greedyNav: {
            type: Boolean,
            default() {
                return false;
            },
        },

        needClickOutside: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },

    mounted() {
        document.addEventListener('click', this.clickOutside);

        if (this.greedyNav) {
            window.addEventListener('resize', debounce(this.updateNav, 100));

            this.updateNav();
        }
    },

    destroyed() {
        document.removeEventListener('click', this.clickOutside);

        if (this.greedyNav) {
            window.removeEventListener('resize', this.updateNav);
        }
    },

    data() {
        return {
            isMoreVisible: false,
            visibleItems: JSON.parse(JSON.stringify(this.items)),
            hiddenItems: [],
            breaks: [],
        };
    },

    methods: {
        clickOutside(e) {
            if (e.target.closest('.navList__item--more') === null && this.needClickOutside) {
                this.hideMoreVisible();
            }
        },

        updateNav() {
            const nav = this.$refs.nav;
            const visibleList = this.$refs.visibleList;

            const availableWidth = nav ? nav.clientWidth : 0;
            const currentWidth = visibleList ? visibleList.clientWidth : 0;

            if (currentWidth > availableWidth) {
                this.breaks.push(currentWidth);

                const removedItem = this.visibleItems.pop();

                if (removedItem) {
                    this.hiddenItems.unshift(removedItem);
                }
            } else {
                if (availableWidth > this.breaks[this.breaks.length - 1]) {
                    const removedItem = this.hiddenItems.shift();

                    if (removedItem) {
                        this.visibleItems.push(removedItem);
                    }
                    this.breaks.pop();
                }
            }

            if (currentWidth > availableWidth) {
                setTimeout(() => {
                    this.updateNav();
                }, 10);
            }
        },

        toggleMoreVisible() {
            this.isMoreVisible = !this.isMoreVisible;
        },

        hideMoreVisible() {
            this.isMoreVisible = false;
        },
    },

    render() {
        return (
            <div class="navigation" ref="nav">
                {this.visibleItems.length > 0 &&
                <ul class="navList__list" ref="visibleList">
                    {this.visibleItems.map(item => {
                        if (item.status) {
                            return (
                                <li class="navList__item"
                                    key={item.id}>
                                    <div class="navList__itemWrap">
                                        <nav-item class="navList__navItem"
                                                  item={item}
                                                  ref="navItem"
                                                  onAction={() => this.$emit('action')}
                                                  params={this.params}/>

                                        {Array.isArray(item.list) && item.list.length > 0 &&
                                        <div class="navList__innerNav">
                                            <navigation class="navList--inner"
                                                        params={item.params}
                                                        onAction={() => this.$emit('action')}
                                                        needClickOutside={this.needClickOutside}
                                                        items={item.list}/>
                                        </div>
                                        }
                                    </div>
                                </li>
                            );
                        }
                    })}

                    <transition name="fade">
                        {this.hiddenItems.length > 0 &&
                        <li class={`navList__item navList__item--more`}>
                            <button class={`navItem navItem--moreBtn ${this.isMoreVisible ? 'is-active' : ''}`}
                                    onClick={() => this.toggleMoreVisible()}>
                                {this.$i18n.t('navigation.moreTitle')}
                                <svg-icon name="arrow" class="navItem__moreIcon"/>
                            </button>

                            <ul class={`navList__moreList ${this.isMoreVisible ? 'is-active' : ''}`}>
                                {this.hiddenItems.map(item => (
                                    <li class="navList__moreItem"
                                        key={item.id}>
                                        {item.status &&
                                        <nav-item class="navList__navItem navItem--moreItem"
                                                  item={item}
                                                  onAction={() => this.$emit('action')}
                                                  nativeOnClick={() => this.hideMoreVisible()}
                                                  params={item.params}/>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </li>
                        }
                    </transition>
                </ul>
                }
            </div>
        );
    },
};
</script>
