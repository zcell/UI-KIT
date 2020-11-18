<script>
    import draggable from 'vuedraggable';

    export default {
        name: 'UploadImage',

        components: { draggable },

        props: {
            image: {
                type: Object,
                default: null,
            },

            images: {
                default: null,
            },

            label: {
                type: String,
                default: '',
            },

            saveParams: {
                type: Object,
                default() {
                    return {};
                },
            },

            allowedTypes: {
                type: Array,
                default() {
                    return ['jpg', 'webp', 'png', 'jpeg', 'svg'];
                },
            },

            error: {
                default: null,
            },

            disabled: {
                type: Boolean,
                default: false,
            },

            url: {
                type: String,
                default: 'common/uploadTempDoc',
            },

            headers: {
                type: Object,
                default: null,
            },
        },

        mounted() {
            this.curImage = this.image;
        },

        data() {
            return {
                curImage: this.image,
                curGallery: this.images,
                internalError: null,
                curHeaders: { accept: 'application/json, text/plain, */*', ...this.headers },
            };
        },

        methods: {
            update() {
                if (this.multiple) {
                    this.$emit('update', JSON.parse(JSON.stringify(this.curGallery)));
                } else {
                    this.$emit('update', JSON.parse(JSON.stringify(this.curImage)));
                }
            },

            addSaveParams(formData) {
                const saveParams = JSON.parse(JSON.stringify(this.saveParams));
                if (Object.keys(saveParams).length > 0) {
                    for (let key in saveParams) {
                        if (saveParams.hasOwnProperty(key)) {
                            formData.append(key, saveParams[key]);
                        }
                    }
                }

                return formData;
            },

            clickOnInput() {
                this.$refs.input.click();
            },

            async uploadImage(e) {
                let files = e.target.files;
                let form = e.target.closest('form');

                let promiseList = [];

                Array.prototype.forEach.call(files, item => {
                    let arrayedFileName = item.name.split('.');
                    let type = arrayedFileName[arrayedFileName.length - 1].toLowerCase();
                    if (this.allowedTypes.includes(type)) {
                        let formData = new FormData();
                        formData.append('image', item);

                        formData = this.addSaveParams(formData);

                        const sendMethod = async () => {
                            const response = await fetch(this.url, {
                                headers: this.curHeaders,
                                method: 'POST',
                                body: formData,
                            });

                            const responseJson = await response.json();

                            if (response.status === 200) {
                                if (this.multiple) {
                                    this.curGallery.push(responseJson);
                                }
                                this.curImage = responseJson;
                            } else if (400 <= response.status < 500) {
                                this.internalError = responseJson;
                                console.log(responseJson);
                            }
                        };
                        promiseList.push(sendMethod());
                    }
                });

                await Promise.all(promiseList)
                    .then(() => {
                        this.updateSize();
                        this.update();
                    })
                    .catch(error => console.log(error));

                form.reset();
            },

            updateSize() {
                const addEvent = imageElement => {
                    if (imageElement) {
                        imageElement.onload = () => {
                            this.$emit('updateSize', { w: imageElement.naturalWidth, h: imageElement.naturalHeight });
                        };
                    }
                };

                this.$nextTick(() => {
                    if (this.multiple && Array.isArray(this.curGallery) && this.curGallery.length) {
                        for (const item of this.curGallery) {
                            const imageElement = this.$refs[this.generateID(item)];
                            addEvent(imageElement);
                        }
                    } else {
                        const imageElement = this.$refs[this.generateID(this.curImage)];

                        addEvent(imageElement);
                    }
                });
            },

            deleteImage(index = null) {
                if (this.multiple && index !== null) {
                    this.curGallery.splice(index, 1);
                } else {
                    this.curImage = null;
                    this.$emit('updateSize', { w: null, h: null });
                }
                this.update();
            },

            generateID(image) {
                if (image) {
                    const spliteURL = image.thumb.split('/');
                    return spliteURL[spliteURL.length - 1];
                }
            },
        },

        computed: {
            checkImage() {
                return !!this.curImage?.thumb || null;
            },

            multiple() {
                return Array.isArray(this.curGallery);
            },

            generatedID() {
                if (this.checkImage) {
                    const spliteURL = this.curImage?.thumb.split('/');
                    return spliteURL[spliteURL.length - 1];
                }
            },
        },

        render() {
            return (
                <div class={`uploadImage ${this.multiple ? 'multiple' : ''}`}>
                    <div class="uploadImage__inner">
                        <p class="uploadImage__text">{this.label}</p>
                        {this.multiple && (
                            <div class="uploadImage__list">
                                <draggable
                                    tag="div"
                                    class="uploadImage__draggable"
                                    list={this.curGallery}
                                    handle=".js-imageHandle"
                                    group={'images'}
                                    ghost-class="uploadImage__ghost"
                                    onChange={() => this.update()}>
                                    {Array.isArray(this.curGallery) &&
                                        this.curGallery.length > 0 &&
                                        this.curGallery.map((image, index) => {
                                            return (
                                                <div class="uploadImage__galleryItem js-imageHandle" key={image.thumb}>
                                                    <img src={image?.thumb} alt="image" ref={this.generateID(image)} class="uploadImage__thumb" />

                                                    {!this.disabled && (
                                                        <button class="uploadImage__deleteImage" onClick={() => this.deleteImage(index)}>
                                                            ×
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}

                                    {!this.disabled && Array.isArray(this.curGallery) && (
                                        <form
                                            key={`fileInput${this.curGallery.length}`}
                                            onSubmit={e => e.preventDefault()}
                                            class="uploadImage__galleryItem uploadImage__galleryItem--add">
                                            <button class="uploadImage__galleryBtn" onClick={e => this.clickOnInput(e)}>
                                                <span class="uploadImage__galleryBtnImage"></span>

                                                <input
                                                    class="uploadImage__hiddenInput"
                                                    type="file"
                                                    ref="input"
                                                    accept={`.${this.allowedTypes.join(', .')}`}
                                                    onInput={async e => await this.uploadImage(e)}
                                                    multiple
                                                />
                                            </button>
                                        </form>
                                    )}
                                </draggable>
                            </div>
                        )}

                        {!this.multiple && (
                            <div>
                                {this.checkImage && (
                                    <div class="uploadImage__galleryItem">
                                        {!this.disabled && (
                                            <button class="uploadImage__deleteImage" onClick={() => this.deleteImage()}>
                                                ×
                                            </button>
                                        )}

                                        <img src={this.curImage.thumb} ref={this.generateID(this.curImage)} alt="alt" class="uploadImage__thumb" />
                                    </div>
                                )}

                                {!this.disabled && !this.checkImage && (
                                    <form onSubmit={e => e.preventDefault()}>
                                        <button class="uploadImage__galleryBtn" onClick={e => this.clickOnInput(e)}>
                                            <span class="uploadImage__galleryBtnImage"></span>
                                            <input
                                                class="uploadImage__hiddenInput"
                                                type="file"
                                                ref="input"
                                                accept={`.${this.allowedTypes.join(', .')}`}
                                                onChange={async e => await this.uploadImage(e)}
                                            />
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {this.error && <div class="uploadImage__errorMessage">{this.error}</div>}
                    </div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .uploadImage {
        @import '../../assets/reset';

        box-sizing: border-box;

        &--marginBottom {
            margin-bottom: 18px;
        }

        &__inner {
            display: flex;
            flex-wrap: wrap;
        }

        &__draggable {
            display: flex;
            flex-wrap: wrap;
        }

        &.multiple {
            display: flex;
            flex-wrap: wrap;
        }

        &__text {
            display: block;
            margin-bottom: 4px;
            line-height: 1.2;
            width: 100%;

            vertical-align: bottom;
            font-size: 12px;
            font-weight: 400;
            color: #747678;
        }

        &__deleteImage {
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;

            padding: 0;
            margin: 0;

            background: rgba(255, 255, 255, 0.3);
            border: none;
            cursor: pointer;
            outline: none;
            font-size: 20px;
            line-height: 1;
            color: rgba(0, 0, 0, 0.6);

            &:hover {
                color: $red;
            }
        }

        &__deleteIcon {
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
            fill: rgba(226, 60, 60, 0.9);
        }

        &__gallery &__text {
            display: block;
            width: 100%;
        }

        &__galleryItem {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 400px;
            min-height: 70px;
            min-width: 50px;
            margin: 0 10px 10px 0;
            padding: 1px;

            background-color: $graySoft;
            border: 1px solid $gray;
            border-radius: 2px;
            overflow: hidden;

            &--add {
                align-items: center;
                flex-shrink: 0;

                background: none;
                border: none;
            }
        }

        &__thumb {
            cursor: grab;
            max-width: 120px;
            object-fit: cover;

            &:active {
                cursor: grabbing;
            }
        }

        &__ghost {
            opacity: 0.4;
        }

        &__list {
            display: flex;
        }

        &__errorMessage {
            display: block;
            width: 100%;

            font-size: 10px;
            color: $red;
            font-weight: 400;
            line-height: 1.2;
        }

        &__hiddenInput {
            display: none;
        }

        &__galleryBtn {
            height: 100%;
            margin: 0;
            padding: 0;

            background: none;
            border: none;
            cursor: pointer;
        }

        &__galleryBtnImage {
            position: relative;

            display: block;
            width: 96px;
            height: 69px;

            background: $graySoft;
            border: 1px solid $formBorder;
            border-radius: 2px;

            &:before,
            &:after {
                content: '';
                position: absolute;
                left: calc(50% - 12px);
                top: calc(50% - 1px);

                width: 24px;
                height: 2px;

                background: $formBorder;

                transition: background 0.12s ease;
            }

            &:after {
                transform: rotate(90deg);
            }

            &:hover:before,
            &:hover:after {
                background: $mainGreen;
            }
        }

        &__svgHidden {
            display: none;
        }
    }
</style>
