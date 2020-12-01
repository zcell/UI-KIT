import swal from '@/helpers/sweetAlert';

export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
        isFixedBundle: {
            default() {
                return false;
            },
        },
        orderList: {
            type: Array,
            default() {
                return [];
            },
        },
        checkbox: {
            default() {
                return false;
            },
        },
    },

    mounted() {
        if (process.browser) {
            document.addEventListener('click', this.outClick);
        }
    },

    destroyed() {
        document.removeEventListener('click', this.outClick);
    },

    data() {
        return {
            dropMenu:
                this.place === 'order'
                    ? [
                          { id: 0, value: 'Возрастанию' },
                          { id: 1, value: 'Убыванию' },
                      ]
                    : [{ id: 0, value: 'Удалить' }],
            isDropMenuShow: false,
            status: this.checkbox,
            curItem: this.item,
        };
    },

    methods: {
        change() {
            this.$emit('updateItem', JSON.parse(JSON.stringify(this.curItem)));
        },

        action(e) {
            if (!this.curItem.isWritePermissionAllowed) {
                this.isDropMenuShow = false;

                if (e.value.toLowerCase() === 'удалить' || e.value.toLowerCase() === 'delete') {
                    this.$emit('deleteItem', this.curItem.id);
                }
            } else {
                swal.getErrorAlert({ text: 'У вас нет доступа!' });
            }

            this.change();
        },

        test() {
            this.isDropMenuShow = false;
        },

        changeStatus(e) {
            this.$emit('statusChange', { id: e.id, field: 'status' });
            this.change();
        },

        outClick(e) {
            if (
                e.target.closest('.customListItem__contextMenu' + this.curItem.id) === null &&
                e.target.closest('.customListItem__contextBtn' + this.curItem.id) === null &&
                this.isDropMenuShow
            ) {
                this.isDropMenuShow = false;
            }
        },

        getContextMenu() {
            return (
                <div class="customListItem__contextMenu">
                    <button
                        class={'customListItem__contextBtn customListItem__contextBtn' + this.curItem.id}
                        onClick={() => (this.isDropMenuShow = !this.isDropMenuShow)}>
                        <svg-icon name="dropMenu" class="customListItem__menuIcon" />
                    </button>

                    <drop-menu
                        class={'customListItem__dropMenu dropMenu--arrowLeftTop customListItem__dropMenu' + this.curItem.id}
                        items={this.dropMenu}
                        v-show={this.isDropMenuShow}
                        onChange={e => this.action(e)}
                    />
                </div>
            );
        },
    },
};
