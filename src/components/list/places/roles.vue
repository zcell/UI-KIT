<script>
    import listItem from './listItem';
    export default {
        name: 'roles',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem userItem">
                    {this.getContextMenu()}

                    {this.curItem?.name && (
                        <div class="userItem__name">
                            <p class="customListItem__text">{this.curItem?.name}</p>
                        </div>
                    )}

                    <edit-btn
                        class="userItem__edit"
                        onClick={() =>
                            this.$router.push({
                                name: 'users-slug',
                                params: { slug: 'roles-' + this.curItem.id },
                            })
                        }
                    />
                </li>
            );
        },
    };
</script>
