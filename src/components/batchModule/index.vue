<script>
    import {getConfirmAlert} from '../sweetAlert/index.js';
    import DefaultHeading from '../defaultHeading/index';
    import Tabs from '../tabs/index';
    import { Tab } from 'vue-tabs-component';

    export default {
        name: 'BatchModule',

        components: {
            DefaultHeading,
            Tabs,
            Tab,
        },

        props: {
            tabs: {
                type: Array,
                required: true,
                validator(value) {
                    let matches = false;

                    if (Array.isArray(value)) {
                        for (const item of value) {
                            let listenersMatches = false;

                            if (Array.isArray(item.listeners) === false) {
                                const listenersKeys = Object.keys(item.listeners);

                                for (const key of listenersKeys) {
                                    if (item.listeners[key] === null || typeof item.listeners[key] === 'function') {
                                        listenersMatches = true;
                                    } else {
                                        listenersMatches = false;
                                        break;
                                    }
                                }
                            }

                            if (
                                item &&
                                item.hasOwnProperty('id') &&
                                typeof item.id === 'string' &&
                                item.hasOwnProperty('name') &&
                                typeof item.name === 'string' &&
                                item.hasOwnProperty('listeners') &&
                                listenersMatches &&
                                item.hasOwnProperty('props') &&
                                item.props.toString() === '[object Object]'
                            ) {
                                matches = true;
                            } else {
                                matches = false;
                                break;
                            }
                        }
                    }

                    return matches;
                },
            },

            title: {
                type: String,
                default() {
                    return '';
                },
            },
        },

        data() {
            return {
                currTab: null,
                mountCounter: 0, //для конфирма
                isEdited: false,
            };
        },

        methods: {
            async tabChanged(e) {
                const changeTab = async () => {
                    const hash = e.tab.hash;
                    const id = e.tab.id;
                    this.currTab = this.tabs.find(tab => tab.id === id);
                    // баг табов, 2 срабатывания на первую загрузку
                    if (this.mountCounter < 3) {
                        this.mountCounter++;
                    }

                    const go = async () => {
                        if (typeof this.$router !== 'undefined' && typeof this.$router.push === 'function') {
                            this.$router.push({ hash });
                        }
                        this.$emit('tabChanged', hash);
                    };

                    await go();
                };

                await changeTab();
            },

            async confirm() {
                if (this.mountCounter >= 1 && this.isEdited) {
                    const confirm = await getConfirmAlert({
                        title: 'Вы уверены?',
                        text: 'Несохраненные изменения будут потеряны',
                    });
                    this.isEdited = !confirm.value;
                    return confirm.value;
                }
                return true;
            },

            prepareComponent(item) {
                const TabComponent = item.component;
                const componentListeners = {};
                Object.keys(item?.listeners || {}).forEach(key => (componentListeners[key] = e => this.subscribedHandler(e, item.listeners[key])));

                return {
                    TabComponent,
                    componentListeners,
                    props: item.props,
                };
            },

            onEdit() {
                this.isEdited = true;
            },

            onSave() {
                this.isEdited = false;
            },

            subscribedHandler(e, callback) {
                this.onEdit();
                if (typeof callback === 'function') {
                    callback(e);
                }
            },
        },

        render() {
            return (
                <div class="batchModule">
                    <default-heading class="defaultHeading batchModule__heading" title={this.title} isControlsNeed={false} />

                    {Array.isArray(this.tabs) && (
                        <tabs class="defaultTabs store__tabs" onChanged={async e => await this.tabChanged(e)} tabWillChangeCallback={this.confirm}>
                            {this.tabs.map(item => {
                                const { TabComponent, componentListeners, props } = this.prepareComponent(item);
                                if (TabComponent) {
                                    return (
                                        <tab isDisabled={false} id={item.id} key={item.id} name={item.name}>
                                            {item.id.toString() === this.$route.hash.replace('#', '') && (
                                                <TabComponent props={props} on={componentListeners} onSave={() => this.onSave()} />
                                            )}
                                        </tab>
                                    );
                                }
                            })}
                        </tabs>
                    )}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    .batchModule {
        &__heading {
            margin-bottom: 30px;
        }
    }
</style>
