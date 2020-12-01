<script>
import btn from '../btn/btn';
import checkbox from '../checkbox/index';

export default {
    name: 'CustomListItem',

    props: {
        item: {
            type: Object,
        },

        contents: {
            type: Array,
        },

        showStatus: {
            type: Boolean,
            default: false,
        },

        showEdit: {
            type: Boolean,
            default: true,
        },

        showDelete: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            curItem: this.item,
            status: false,
            selected: false,
        };
    },

    methods: {
        edit() {
            this.$emit('deleteItem', this.currItemCopy);
            this.change();
        },

        selectItem(e) {
            this.$emit('selectedItem', {item: this.currItemCopy, selected: e});
            this.change();
        },

        changeStatus() {
            this.$emit('statusChange', {id:this.currItemCopy.id, field: 'status'});
            this.change();
        },

        delete() {
            this.$emit('deleteItem', this.currItemCopy);
            this.change();
        },

        change() {
            this.$emit('updateItem', this.currItemCopy);
        },

        renderProperty(prop) {
            let html = '';

            if (prop.hasOwnProperty('label') && prop.label) {
                html = `<div class="customListItem__propertyTitle">${prop.label}</div>`;
            }
            if (prop.hasOwnProperty('value') && prop.value) {
                html += `<div class="customListItem__propertyValue">${prop.value}</div>`;
            }
            if (prop.hasOwnProperty('thumb') && prop.thumb) {
                html += `<div class="customListItem__propertyThumb">
                                <img src="${prop.thumb}" alt="${prop.name ? prop.name : ''}" />
                            </div>`;
            }

            return html;
        },
    },

    computed: {
        classNames() {
            let classes = 'customListItem';
            classes += this.selected ? ' is-selected' : '';
            classes += this.status ? '' : ' is-disabled';
            return classes;
        },

        currItemCopy() {
            return JSON.parse(JSON.stringify(this.curItem))
        }
    },

    render() {
        return (
            <li class={this.classNames} >
                <checkbox class="customListItem__selectItem" v-model={this.selected}
                          onInput={e => this.selectItem(e)}/>

                <div class="customListItem__properties">
                    {Array.isArray(this.contents) &&
                    this.contents.map(prop => {
                        return (
                            <div class="customListItem__property">
                                {Array.isArray(prop) === true &&
                                prop.map(innerProp => {
                                    return <div class="customListItem__propertyRow" domPropsInnerHTML={this.renderProperty(innerProp)}/>;
                                })}

                                {Array.isArray(prop) === false && (
                                    <div class="customListItem__propertyCol" domPropsInnerHTML={this.renderProperty(prop)}/>
                                )}
                            </div>
                        );
                    })}

                    {this.$slots.default}
                </div>

                <div class="customListItem__controls">
                    {this.showStatus && (
                        <checkbox
                            class="customListItem__status"
                            type="roll"
                            v-model={this.status}
                            onInput={() => this.changeStatus()}
                        />
                    )}

                    {this.showDelete && (
                        <btn class="customListItem__btn customListItem__btn--delete" type="danger"
                             onClick={() => this.delete()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path
                                    d="M2.9 14.2c0 1 .8 1.8 1.8 1.8h7c1 0 1.9-.8 1.9-1.8V3.6H2.9v10.6zM14.4 1h-3l-1-.9H6l-.9.9H2v1.8h12.4V.9z"/>
                            </svg>
                        </btn>
                    )}

                    {this.showEdit && (
                        <btn class="customListItem__btn customListItem__btn--edit" onClick={() => this.edit()}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="customListItem__btnEditIcon" viewBox="0 0 16 16">
                                <g clip-path="url(#clip0)">
                                    <path
                                        d="M10 2.7L13.1 6 5 14.2l-3.3-3.3L10 2.7zm5.7-.8L14.2.5a1.4 1.4 0 00-2 0l-1.4 1.3 3.3 3.3 1.6-1.6a1.1 1.1 0 000-1.6zM0 15.5a.4.4 0 00.5.4l3.6-.8-3.3-3.3-.8 3.7z"/>
                                </g>
                            </svg>
                        </btn>
                    )}
                </div>
            </li>
        );
    },
};
</script>

<style lang="scss">
@import '../../assets/globals';

.customListItem {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;

  font-family: $FontFamily;
  border: 1px solid $gray;
  border-radius: 2px;
  background: $white;

  &__selectItem {
    position: absolute;
    left: -1px;
    top: -1px;
  }

  &__properties {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    font-size: $xs-font-size;
  }

  &__property {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 170px;
    margin-right: 50px;
  }

  &__propertyCol {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__propertyRow {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__propertyTitle {
    color: $additionalText;
    font-size: $xs-font-size;
  }

  &__propertyValue {
    color: $mainText;
    font-size: $sm-font-size;
  }

  &__propertyRow {
    margin-bottom: 3px;
  }

  &__propertyRow &__propertyTitle {
    font-size: $sxs-font-size;
    margin: 0 3px 0 0;
  }

  &__propertyRow &__propertyValue {
    font-size: $sxs-font-size;
  }

  &__propertyThumb {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    @include below($md-desktop) {
      margin-right: 15px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
      margin-right: 40px;

      @include below($md-desktop) {
        margin-right: 25px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__btn {
    width: 36px;
    height: 36px;
    padding: 5px;
    min-height: auto;

    border-radius: 2px;

    svg {
      display: block;
      width: 15px;
      height: 16px;
      margin: 0;
      padding: 0;
      color: inherit;
      fill: currentColor;
    }

    &--edit {
      border-color: $mainGreen;
      color: $mainGreen;
    }

    &--delete {
      margin-right: 15px;

      background: $white;
      border-color: $red;
      color: $red;
    }
  }

  &__status {
    height: 16px;
  }
}
</style>
