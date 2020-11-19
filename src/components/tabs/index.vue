<script>
    import { Tabs } from 'vue-tabs-component';
    import expiringStorage from 'vue-tabs-component/src/expiringStorage';

    export default {
        name: 'Tabs',

        mixins: [Tabs],

        props: {
            cacheLifetime: {
                default: 5,
            },

            options: {
                type: Object,
                required: false,
                default: () => ({
                    useUrlFragment: true,
                    defaultTabHash: null,
                }),
            },

            tabWillChangeCallback: {
                default() {
                    return null;
                },
            },
        },

        data: () => ({
            tabs: [],
            activeTabHash: '',
            activeTabIndex: 0,
            lastActiveTabHash: '',
        }),

        computed: {
            storageKey() {
                return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`;
            },
        },

        created() {
            this.tabs = this.$children;
        },

        methods: {
            findTab(hash) {
                return this.tabs.find(tab => tab.hash === hash);
            },

            async selectTab(selectedTabHash, event) {
                // See if we should store the hash in the url fragment.
                if (event && !this.options.useUrlFragment) {
                    event.preventDefault();
                }

                const selectedTab = this.findTab(selectedTabHash);

                if (typeof this.tabWillChangeCallback === 'function') {
                    const confirm = await this.tabWillChangeCallback();

                    if (!confirm) {
                        return false;
                    }
                }

                if (!selectedTab) {
                    return;
                }

                if (selectedTab.isDisabled) {
                    //event.preventDefault();
                    return;
                }

                if (this.lastActiveTabHash === selectedTab.hash) {
                    this.$emit('clicked', { tab: selectedTab });
                    return;
                }

                this.tabs.forEach(tab => {
                    tab.isActive = tab.hash === selectedTab.hash;
                });
                this.$emit('changed', { tab: selectedTab });

                this.activeTabHash = selectedTab.hash;
                this.activeTabIndex = this.getTabIndex(selectedTabHash);

                this.lastActiveTabHash = this.activeTabHash = selectedTab.hash;

                expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime);
            },

            setTabVisible(hash, visible) {
                const tab = this.findTab(hash);

                if (!tab) {
                    return;
                }

                tab.isVisible = visible;

                if (tab.isActive) {
                    // If tab is active, set a different one as active.
                    tab.isActive = visible;

                    this.tabs.every((tab, index, array) => {
                        if (tab.isVisible) {
                            tab.isActive = true;

                            return false;
                        }

                        return true;
                    });
                }
            },

            getTabIndex(hash) {
                const tab = this.findTab(hash);

                return this.tabs.indexOf(tab);
            },

            getTabHash(index) {
                const tab = this.tabs.find(tab => this.tabs.indexOf(tab) === index);

                if (!tab) {
                    return;
                }

                return tab.hash;
            },

            getActiveTab() {
                return this.findTab(this.activeTabHash);
            },

            getActiveTabIndex() {
                return this.getTabIndex(this.activeTabHash);
            },
        },

        render() {
            return (
                <div class="tabs-component">
                    <ul role="tablist" class="tabs-component-tabs">
                        {this.tabs.map((tab, i) => {
                            return (
                                <li
                                    key={i}
                                    class={`tabs-component-tab ${tab.isActive ? 'is-active' : ''} ${tab.isDisabled ? 'is-disabled' : ''}`}
                                    role="presentation"
                                    v-show={tab.isVisible}>
                                    <a
                                        domPropsInnerHTML={tab.header}
                                        aria-controls={tab.hash}
                                        aria-selected={tab.isActive}
                                        onClick={e => this.selectTab(tab.hash, e)}
                                        href="javascript:void(0)"
                                        class="tabs-component-tab-a"
                                        role="tab"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <div class="tabs-component-panels">{this.$slots.default}</div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .tabs-component.defaultTabs {
        width: 100%;
        display: flex;
        flex-direction: column;

        &.noPadding {
            section {
                padding-top: 0 !important;
                margin-top: 0 !important;
            }
        }

        .tabs-component-tabs {
            position: relative;

            display: flex;
            justify-content: flex-start;
            align-items: stretch;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;

            overflow: auto;
            list-style: none;
            font-family: $FontFamily;
        }

        .tabs-component-tab {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: stretch;
            padding: 0 40px 0 3px;
            min-height: 25px;
            margin-bottom: 20px;
            flex-shrink: 0;

            transition: all ease 0.15s;
            overflow: hidden;

            &:after {
                position: absolute;
                content: '';
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;

                background: $graySoft;
                pointer-events: none;
            }

            &:last-of-type {
                padding-right: 3px;
            }

            &.is-active {
                a.tabs-component-tab-a {
                    position: relative;
                    display: block;
                    height: 100%;

                    color: $mainGreen;

                    &:hover {
                        color: $mainGreen;
                    }

                    &:after {
                        position: absolute;
                        z-index: 1;
                        bottom: 0;
                        content: '';

                        display: block;
                        width: 100%;
                        height: 2px;

                        background: $mainGreen;
                    }
                }
            }

            .tabs-component-tab-a {
                font-size: 14px;
                font-weight: 400;

                color: inherit;
                text-decoration: none;
            }

            &.is-disabled {
                pointer-events: none;
            }
        }

        .tabs-component-panels {
            padding-top: 20px;

            //section {
            //  padding-top: 200px;
            //  margin-top: -200px;
            //}
        }
    }
</style>
