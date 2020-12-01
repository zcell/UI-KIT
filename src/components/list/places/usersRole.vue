<script>
    import listItem from './listItem';

    export default {
        name: 'usersRole',

        mixins: [listItem],

        render() {
            return (
                <li class="customListItem userItem">
                    {this.getContextMenu()}

                    <div class="userItem__wrapper userItem__wrapper--name">
                        {this.curItem?.name && <p class="customListItem__text">{this.curItem.name}</p>}
                    </div>

                    <div class="userItem__wrapper userItem__wrapper--name">
                        {this.curItem.role?.name && <p class="text userItem__text">{this.curItem.role?.name}</p>}
                    </div>

                    {this.curItem.phone && (
                        <div class="userItem__wrapper">
                            <p class="text userItem__text">{this.curItem.phone}</p>
                        </div>
                    )}

                    {this.curItem.email && (
                        <div class="userItem__wrapper">
                            <p class="text userItem__text">{this.curItem.email}</p>
                        </div>
                    )}

                    <div class="userItem__wrapper userItem__wrapper--lastVisited">
                        {this.curItem.lastVisitAt && <p class="text userItem__text">{this.curItem.lastVisitAt}</p>}
                    </div>

                    <checkbox
                        class="checkbox--roll userItem__checkbox"
                        type="checkbox"
                        v-model={this.status}
                        onInput={() => this.changeStatus(this.curItem)}
                    />

                    <edit-btn
                        class="userItem__edit"
                        onClick={() =>
                            this.$router.push({
                                name: 'users-slug',
                                params: { slug: 'users-' + this.curItem.id },
                            })
                        }
                    />
                </li>
            );
        },
    };
</script>

<style lang="scss">
    .userItem {
        justify-content: flex-start;
        padding: 25px 30px;

        &__text {
            text-decoration: underline;
        }

        &__wrapper {
            width: 150px;
            margin-right: 70px;

            @include below($md-desktop) {
                margin-right: 30px;
            }

            &--name {
                margin-right: 100px;

                @include below($md-desktop) {
                    margin-right: 30px;
                }
            }

            &--lastVisited {
                margin-right: 90px;

                @include below($md-desktop) {
                    margin-right: 20px;
                }
            }
        }

        &__userStatus {
            margin-right: 30px;
        }

        &__checkbox {
            margin-left: auto;
            margin-right: 50px;
            padding-bottom: 17px;

            @include below($md-desktop) {
                margin-right: 20px;
            }
        }

        &__edit {
            margin-left: auto;
        }
    }
</style>
