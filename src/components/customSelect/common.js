import { fieldExtractor } from './helper';

function htmlToElement(html) {
    if (process.browser) {
        const template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
}

export default {
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        selected: {
            default() {
                return {};
            },
        },
        selectedItems: {
            type: Array,
            default() {
                return [];
            },
        },
        label: {
            type: String,
            default: '',
        },
        error: {
            default: null,
        },
        updateState: {
            type: Boolean,
            default: false,
        },
        hideOnSelect: {
            type: Boolean,
            default: true,
        },
        id: {
            type: String,
            default: 'id',
        },
        placeholder: {
            type: String,
            default: '',
        },
        fields: {
            type: Object,
            default() {
                return { id: 'id', value: 'value' };
            },
        },
        required: {
            type: Boolean,
            default: false,
        },
        defaultSelectedValue: {
            type: Object,
            default() {
                return {
                    id: null,
                    value: null,
                };
            },
        },
        selectedField: {
            type: String,
            default: 'id',
        },

        customIcon: {
            type: String,
            default: '',
        },

        customSearchIcon: {
            type: String,
            default: '',
        },
    },

    mounted() {
        if (process.browser) {
            document.addEventListener('click', this.clickOutside);
        }

        if (this.required) {
            this.value = this.fields.value ? fieldExtractor(this.currSelected || {}, this.fields.value) : '';
        }
    },

    destroyed() {
        if (process.browser) {
            document.removeEventListener('click', this.clickOutside);
        }
    },

    data() {
        return {
            currItems: this.items,
            isOpen: false,
            appearance: false,
            openToTop: false,
            value: '',
            activeItemIndex: 0,
            isInFocus: false,
        };
    },

    watch: {
        updateCurrState() {
            if (this.isSearch === false) {
                this.currItems = this.items;
                this.activeItemIndex = 0;
                this.value = '';
            } else {
                this.currItems = [];
            }
        },
        currPropItems() {
            let currItems = this.currItems || [];
            let propItems = this.items || [];
            const sortMethod = array => {
                return array.sort((a, b) => {
                    return JSON.stringify(a || '') < JSON.stringify(b || '');
                });
            };
            if (currItems && propItems) {
                currItems = JSON.parse(JSON.stringify(currItems));
                propItems = JSON.parse(JSON.stringify(propItems));
                let sortedCurrItems = sortMethod(currItems);
                let sortedPropItems = sortMethod(propItems);
                if (JSON.stringify(sortedPropItems) !== JSON.stringify(sortedCurrItems) && this.isSearch === false) {
                    this.currItems = this.items;
                }
            }
        },
        currSelected() {
            if (this.value !== fieldExtractor(this.currSelected || {}, this.fields.value) && this.isSearch === false) {
                this.value = fieldExtractor(this.currSelected || {}, this.fields.value);
            }
        },
    },

    methods: {
        toggle() {
            if (!this.readonly) {
                this.isOpen = !this.isOpen;
                this.appearance = true;
                setTimeout(() => {
                    let dropList = this.$refs?.dropList;
                    this.appearance = false;
                    this.openToTop = document?.documentElement?.clientHeight - dropList?.getBoundingClientRect()?.bottom < 100;

                    if (this.isOpen) {
                        if (this.multiple || this.selectedItems.length > 1) {
                            this.activeItemIndex = 0;
                        }
                        if (this.selectedItems.length === 1) {
                            let selectedItem = this.$refs?.selected;
                            if (selectedItem?.getBoundingClientRect()) {
                                let delta = selectedItem?.getBoundingClientRect()?.top - dropList?.getBoundingClientRect()?.top - 36;
                                dropList.scrollTo({
                                    top: delta,
                                    behavior: 'auto',
                                });

                                const curSelectedIdField = fieldExtractor(this.currSelected || {}, this.fields.id);
                                this.activeItemIndex = this.currItems.findIndex(item => {
                                    const itemFieldId = fieldExtractor(item || {}, this.fields.id);
                                    return itemFieldId === curSelectedIdField;
                                });
                                if (this.activeItemIndex === -1) {
                                    this.activeItemIndex = 0;
                                }
                            }
                        }
                    }
                }, 150);
                this.$emit('clearError');
            }
        },

        onChange() {
            this.isOpen = true;
        },

        clickOutside(e) {
            if (e.target.closest(`.select${this.id}`) === null && this.isOpen) {
                this.hide();
            }
        },

        update(items) {
            this.$emit('change', items);
        },

        getListItemClasses(item, index) {
            let classes = '';
            if (
                fieldExtractor(item, this.fields.id) === fieldExtractor(this.currSelected || {}, this.fields.id) ||
                this.isRecordIncludes(fieldExtractor(item, this.fields.id), this.multiple ? this.selected : this.selectedItems || [])
            ) {
                classes += 'selected ';
            }
            if (this.activeItemIndex === index) {
                classes += 'select__dropItem--active';
            }
            return classes;
        },

        getListItemRefs(item) {
            let ref = '';
            if (
                fieldExtractor(item, this.fields.id) === fieldExtractor(this.currSelected || {}, this.fields.id) ||
                this.isRecordIncludes(fieldExtractor(item, this.fields.id), this.multiple ? this.selected : this.selectedItems || [])
            ) {
                ref = 'selected';
            }

            return ref;
        },

        isRecordIncludes(id, array) {
            if (Array.isArray(array) && array.length > 0) {
                return array.findIndex(item => id === fieldExtractor(item, this.fields.id)) !== -1;
            }
        },

        keyHandler(e) {
            if (this.isOpen === true) {
                let dropList = this.$refs?.dropList;
                if (dropList) {
                    let dropListOffset = dropList.scrollTop;

                    if (this.activeItemIndex >= 0 && dropList) {
                        if (e.code === 'ArrowDown' && this.activeItemIndex + 1 < this.currItems.length) {
                            e.preventDefault();
                            this.activeItemIndex += 1;
                            dropList.scrollTo({
                                top: dropListOffset + 36,
                                behavior: 'auto',
                            });
                        }
                        if (e.code === 'ArrowUp' && this.activeItemIndex > 0) {
                            e.preventDefault();
                            this.activeItemIndex -= 1;
                            dropList.scrollTo({
                                top: dropListOffset - 36,
                                behavior: 'auto',
                            });
                        }
                        if (e.code === 'Enter' && !e.ctrlKey) {
                            e.preventDefault();
                            this.selectThis(this.currItems[this.activeItemIndex]);
                        }
                        if (e.code === 'Escape') {
                            e.preventDefault();
                            this.hide();
                        }
                        if (e.code === 'Tab') {
                            this.hide();
                        }
                        if (e.code === 'Enter' && e.ctrlKey && this.multiple) {
                            e.preventDefault();
                            this.update();
                            this.hide();
                        }
                    }
                }
            } else {
                if (e.code === 'Enter' && !e.ctrlKey) {
                    e.preventDefault();
                    this.toggle();
                }
            }
        },

        hide() {
            if (this.isSearch) {
                this.activeItemIndex = 0;
            }
            this.isOpen = false;
        },

        async selectThis(fItem) {
            const id = fieldExtractor(fItem, this.fields.id);
            if (this.readonly === false) {
                if (id !== null) {
                    let clone = this.currItems.find(item => fieldExtractor(item, this.fields.id) === id);
                    clone = JSON.parse(JSON.stringify(clone));

                    if (this.multiple || !this.selected?.id) {
                        this.activeItemIndex = this.currItems.findIndex(item => fieldExtractor(item, this.fields.id) === id);
                    } else {
                        const selectedIdValue = fieldExtractor(this.currSelected || {}, this.fields.id);
                        this.activeItemIndex = this.currItems.findIndex(item => fieldExtractor(item, this.fields.id) === selectedIdValue);
                    }

                    if (this.required) {
                        this.value = fieldExtractor(this.currSelected || {}, this.fields.value);
                    }

                    if (this.multiple) {
                        await this.updateMultiple(clone);

                        this.value = '';
                        if (this.isSearch) {
                            this.onInput('');
                        }
                    } else if (
                        fieldExtractor(clone || {}, this.fields.id) === fieldExtractor(this.currSelected || {}, this.fields.id) &&
                        fieldExtractor(this.defaultSelectedValue, this.fields.value) !== null
                    ) {
                        await this.update(this.defaultSelectedValue);
                    } else {
                        await this.update(clone);
                        this.value = clone.value;
                    }

                    if (this.isLocalSearch) {
                        this.currItems = this.items;
                    }
                }
                if (this.hideOnSelect === true) {
                    this.hide();
                }
            }
        },

        renderDropList() {
            if (this.showDropList && this.isOpen) {
                return (
                    <ul ref="dropList" class={`select__dropList ${this.getDropListClasses}`}>
                        {this.currItems.map((item, index) => {
                            return (
                                <li
                                    class={`select__dropItem ${this.getListItemClasses(item, index)}`}
                                    ref={this.getListItemRefs(item)}
                                    onClick={() => {
                                        this.selectThis(item);
                                    }}
                                    onMouseDown={e => {
                                        if (e.button === 0) {
                                            e.preventDefault();
                                        }
                                    }}
                                    key={fieldExtractor(item, this.fields.id) + '__' + index}>
                                    {fieldExtractor(item || {}, this.fields.value)}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        },

        renderIcon() {
            if (this.isSearch && this.hideSearchIcon === false) {
                return (
                    (this.customSearchIcon && <div class="select__iconWrapper" domPropsInnerHTML={this.customSearchIcon}></div>) || (
                        <div class="select__iconWrapper">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                                class={`select__icon select__icon--search ${this.getInputIconClasses}`}>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.15 2A5.57 5.57 0 004.6 7.59c0 3.09 2.5 5.59 5.55 5.59 3.06 0 5.55-2.5 5.55-5.6C15.7 4.5 13.21 2 10.15 2zM2.6 7.59A7.57 7.57 0 0110.15 0c4.18 0 7.55 3.4 7.55 7.59A7.57 7.57 0 015.56 13.6l-4.16 4.1L0 16.3l4.15-4.1A7.58 7.58 0 012.6 7.6z"
                                />
                            </svg>
                        </div>
                    )
                );
            } else {
                return (
                    (this.customIcon && <div class="select__iconWrapper" domPropsInnerHTML={this.customIcon}></div>) || (
                        <div class="select__iconWrapper">
                            <svg
                                class={`select__icon ${this.getInputIconClasses} `}
                                onClick={() => this.toggle()}
                                width="8"
                                height="12"
                                viewBox="0 0 8 12"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 4.10742L4 -0.000140408L8 4.10742H0Z" fill="" />
                                <path d="M0 7.89258L4 12.0001L8 7.89258H0Z" fill="" />
                            </svg>
                        </div>
                    )
                );
            }
        },
    },

    computed: {
        computedValue: {
            get() {
                if (this.required) {
                    return this.value;
                } else {
                    const fieldValue = fieldExtractor(this.currSelected || {}, this.fields.value);

                    return ![null, undefined, ''].includes(fieldValue) ? fieldValue : this.value;
                }
            },
            set(value) {
                this.value = value;
            },
        },

        isSearch() {
            return ![null, undefined, ''].includes(this.searchMethod?.url) || this.isLocalSearch;
        },

        multiple() {
            return Array.isArray(this.selected);
        },

        currPropItems() {
            return this.items;
        },

        currSelected() {
            if (['number', 'string'].includes(typeof this.selected)) {
                let clone = this.currItems.find(i => i?.[this.selectedField] === this.selected);

                return clone ? clone : this.defaultSelectedValue;
            }
            if (this.multiple) {
                return this.selected;
            } else {
                return ![null, undefined, ''].includes(fieldExtractor(this.selected || {}, this.fields.id))
                    ? this.selected
                    : this.defaultSelectedValue;
            }
        },

        getInputIconClasses() {
            return `${this.label !== '' ? 'select__icon--isLabel' : ''}`;
        },

        getInputClasses() {
            let classes = 'input--select ';
            if (this.isOpen || fieldExtractor(this.currSelected || {}, this.fields.value) !== null) {
                classes += 'isOpen ';
            }
            if (this.readonly) {
                classes += 'disabled ';
            }
            if (this.multiple && this.isSearch) {
                classes += 'select__input--nested ';
            }
            if (this.multiple && this.isSearch && !this.isInFocus) {
                classes += 'select__input--hidden';
            }
            return classes;
        },

        getListClasses() {
            let classes = '';
            if (this.label) {
                classes += 'isLabel ';
            }
            if (this.error) {
                classes += 'isError ';
            }
            if (this.readonly) {
                classes += 'disabled ';
            }
            if (this.isOpen) {
                classes += 'isOpen';
            }
            return classes;
        },

        showDropList() {
            return this.currItems && this.currItems.length > 0;
        },

        updateCurrState() {
            return this.updateState;
        },

        getDropListClasses() {
            let classes = '';
            if (this.error) {
                classes += 'select__list--noPadding ';
            }
            if (this.openToTop) {
                classes += 'select__dropList--toTop ';
                if (!this.label) {
                    classes += 'select__dropList--toTop--withoutLabel ';
                }
            }
            if (this.appearance) {
                classes += 'select__dropList--appear ';
            }

            return classes;
        },
    },
};
