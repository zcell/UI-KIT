<script>
    import btn from '../btn/btn';

    export default {
        name: 'uploadFile',

        components: {
            btn,
        },

        props: {
            label: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: 'common/uploadTempDoc',
            },

            maxSizeKbyte: {
                type: Number,
                default: 8192,
            },


            headers: {
                type: Object,
                default: null,
            },

            file: {
                type: Object,
                default: null,
            },

            files: {
                type: Array,
                default: null,
            },

            allowedTypes: {
                type: Array,
                default() {
                    return ['txt', 'docx', 'doc', 'pdf', 'xls', 'xml', 'xlsx', 'ott', 'otd'];
                },
            },

            error: {
                default: null,
            },

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                curFiles: [],
                dropArea: null,
                isUploading: false,
                internalError: null,
                curHeaders: { 'accept': 'application/json, text/plain, */*', ...this.headers },
                typesMatches: [
                    { mimeTypes: ['image/jpg'], type: 'jpg' },
                    { mimeTypes: ['image/jpeg'], type: 'jpeg' },
                    { mimeTypes: ['image/png'], type: 'png' },
                    { mimeTypes: ['image/gif'], type: 'gif' },
                    { mimeTypes: ['image/webp'], type: 'webp' },
                    { mimeTypes: ['image/webp'], type: 'webp' },
                    { mimeTypes: ['image/svg+xml'], type: 'svg' },
                    { mimeTypes: ['image/svg+xml'], type: 'svgz' },
                    { mimeTypes: ['application/vnd.oasis.opendocument.text'], type: 'odt' },
                    { mimeTypes: ['application/vnd.oasis.opendocument.text-template'], type: 'ott' },
                    {
                        mimeTypes: ['application/vnd.ms-word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                        type: 'docx',
                    },
                    { mimeTypes: ['application/msword', 'application/vnd.ms-word'], type: 'doc' },
                    { mimeTypes: ['application/pdf'], type: 'pdf' },
                    { mimeTypes: ['text/plain'], type: 'txt' },
                    { mimeTypes: ['application/vnd.ms-excel'], type: 'xls' },
                    { mimeTypes: ['application/xml', 'text/xml'], type: 'xml' },
                    {
                        mimeTypes: [
                            'application/vnd.ms-excel',
                            'application/excel',
                            'application/msexcel',
                            'application/msexcell',
                            'application/x-dos_ms_excel',
                            'application/x-excel',
                            'application/x-ms-excel',
                            'application/x-msexcel',
                            'application/x-xls',
                            'application/xls',
                        ],
                        type: 'xls',
                    },
                    { mimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], type: 'xlsx' },
                ],
            };
        },

        mounted() {
            if (Array.isArray(this.files)) {
                this.curFiles = JSON.parse(JSON.stringify(this.files));
            } else {
                this.curFiles = this.file ? Array.from(JSON.parse(JSON.stringify(this.file))) : [];
            }

            this.dropArea = this.$refs.dropArea;
            if (this.dropArea) {
                const preventDefaults = e => {
                    e.preventDefault();
                    e.stopPropagation();
                };

                const highlight = e => {
                    if (this.isFileLoaded === false) {
                        this.dropArea.classList.add('highlight');
                    }
                };
                const unhighlight = e => {
                    if (this.isFileLoaded === false) {
                        this.dropArea.classList.remove('highlight');
                    }
                };

                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    this.dropArea.addEventListener(eventName, preventDefaults, false);
                });

                ['dragenter', 'dragover'].forEach(eventName => {
                    this.dropArea.addEventListener(eventName, highlight, false);
                });
                ['dragleave', 'drop'].forEach(eventName => {
                    this.dropArea.addEventListener(eventName, unhighlight, false);
                });
                this.dropArea.addEventListener('drop', this.handleDrop, false);
            }
        },

        methods: {
            update() {
                if (this.multiple) {
                    this.$emit('update', JSON.parse(JSON.stringify(this.curFiles)));
                } else {
                    this.$emit('update', JSON.parse(JSON.stringify(this.curFiles[0])));
                }
            },

            clearError() {
                this.$emit('clearError');
                this.internalError = null;
            },

            async handleDrop(e) {
                if (this.isFileLoaded === false) {
                    let dt = e.dataTransfer;
                    let files = dt.files;
                    await this.uploadFiles(files);
                }
            },

            deleteFile(index) {
                this.clearValue();
                this.clearError();
                this.curFiles.splice(index, 1);
            },

            getFileName(file) {
                if (file) {
                    let arrayedURL = file.url.split('/');
                    let name = arrayedURL[arrayedURL.length - 1];
                    let size = file.fileSize + ' байт';

                    if (file.fileSize > 1024) {
                        size = file.fileSize / 102400 < 1 ? `${Math.floor(file.fileSize / 1024)} Кб` : `${Math.floor(file.fileSize / 1024000)} Мб`;
                    }
                    return `${name} (${size})`;
                }
            },

            iconName(file) {
                if (file && file.mimeType) {
                    return this.typesMatches.find(icon => icon.mimeTypes.includes(file.mimeType)).type;
                }
                return 'file';
            },

            async uploadFiles(files) {
                this.clearError();
                // this.curFiles = [];
                let promiseList = [];

                this.curFiles = (Array.isArray(files) && files.length > 0) ? [] : this.curFiles;

                Array.prototype.forEach.call(files, item => {
                    const arrayedFileName = item.name.split('.');
                    const nameOnly = arrayedFileName.slice(0, -1).join('.');
                    const itemType = this.typesMatches.find(type => type.mimeTypes.includes(item.type))?.type;
                    const limitationFileSize = this.maxSizeKbyte ? item.size <= this.maxSizeKbyte * 1024 : true;


                    if (itemType && this.allowedTypes.includes(itemType) && limitationFileSize) {
                        const formData = new FormData();
                        formData.append('file', item);
                        formData.append('fileName', nameOnly);

                        const sendMethod = async () => {
                            const response = await fetch(this.url, {
                                // credentials: 'include',
                                headers: this.headers,
                                method: 'POST',
                                body: formData,
                            });

                            const responseJson = await response.json();

                            if (response.status === 200) {
                                this.curFiles.push(responseJson);
                            } else if (400 <= response.status < 500) {
                                this.internalError = responseJson;
                                console.log(responseJson);
                            }
                        };
                        promiseList.push(sendMethod());
                    }
                });

                this.isUploading = true;
                await Promise.all(promiseList)
                    .then(() => {
                        this.update();
                        this.clearValue();
                    })
                    .catch(error => console.log(error))
                    .finally(() => (this.isUploading = false));
            },

            clearValue() {
                if (this.$refs.input) {
                    this.$refs.input.value = '';
                }
            },
        },

        computed: {
            isFileLoaded() {
                return Array.isArray(this.curFiles) && this.curFiles.length > 0;
            },

            errorMessage() {
                return this.internalError.message || this.error;
            },

            multiple() {
                return Array.isArray(this.files);
            },
        },

        render() {
            return (
                <div
                    class={`uploadFile ${this.multiple && 'uploadFile--multiple'} ${this.disabled && 'uploadFile--disabled'}`}>
                    {this.label && <span class="uploadFile__label">{this.label}</span>}
                    <div class="uploadFile__dropArea" ref="dropArea">
                        {this.isFileLoaded ? (
                            <div class="uploadFile__previewList">
                                {this.curFiles.map((file, index) => {
                                    return (
                                        <div class="uploadFile__preview">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 34"
                                                 class="uploadFile__previewIcon">
                                                <path fill="none" d="M-1-1h802v602H-1z"/>
                                                <path
                                                    d="M0 2C0 .9.9 0 2 0h22a2 2 0 012 2v30a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"/>
                                                <path fill="#fff" d="M5 16h16v1H5v-1zM5 20h16v1H5v-1zM5 24h11v1H5v-1z"/>
                                                <text
                                                    stroke="#000"
                                                    transform="matrix(.33664 0 0 .33664 3.8 8.7)"
                                                    font-family="Helvetica, Arial, sans-serif"
                                                    font-size="24"
                                                    y="6"
                                                    x="27"
                                                    stroke-opacity="null"
                                                    stroke-width="0"
                                                    fill="#fff"
                                                    text-anchor="middle">
                                                    {this.iconName(file)}
                                                </text>
                                            </svg>

                                            <p class="uploadFile__name">{this.getFileName(file)}</p>
                                            <button type="button" class="uploadFile__deleteBtn"
                                                    onClick={() => this.deleteFile(index)}>
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div class="uploadFile__empty">
                                <svg class="uploadFile__icon" width="16" height="16" viewBox="0 0 61 61"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M38.85 30.02c.92 0 1.65.58 1.79 1.42.2 1.05-.5 2-1.57 2.12l-.48.01H27.22c-.24 0-.48 0-.71-.06-.9-.24-1.45-1-1.35-1.9.08-.88.8-1.56 1.71-1.58.86-.02 1.73-.02 2.59-.02H38.85zM27.28 40.51h7.52c1.39 0 2.8.01 4.19-.01a1.7 1.7 0 001.68-1.67A1.74 1.74 0 0039.15 37c-.2-.03-.4-.03-.59-.03h-11.3c-.23 0-.47.02-.7.07-.78.15-1.36.84-1.39 1.63-.03.83.5 1.57 1.29 1.78.27.08.55.06.82.06z"/>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M32.67 0h2.14c.14.1.3.1.45.12h.06a10.93 10.93 0 019.33 8.8l.12.55.63.19c4.93 1.68 8.04 5.01 9.1 10.14.12.54.3.78.83.97a8.39 8.39 0 015.65 7.53 8.5 8.5 0 01-8.22 8.74h-2.2l-1.68.01h-.17c-.2-.01-.4-.02-.64.06v.83c0 .83.01 1.66-.01 2.5-.02.4.1.7.38 1.01a650.32 650.32 0 014.66 5.49c.3.36.62.72.91 1.1.43.57.5 1.2.16 1.86a1.68 1.68 0 01-1.71.97c-.15-.01-.3-.02-.45.08-.08.17-.08.36-.07.54v7.54c0 .89-.34 1.53-1.2 1.86-.05.01-.08.08-.13.11h-4.28c-.12-.11-.26-.1-.39-.13a6.46 6.46 0 01-5.1-4.59c-.2-.06-.4-.05-.6-.05H23.2c-.8 0-1.59-.09-2.32-.42a4.98 4.98 0 01-3.14-4.83V42.2v-4.38-.18c.02-.18.03-.35-.06-.52-.18-.09-.37-.08-.55-.07H8.4a8.56 8.56 0 01-8.23-6.93c-.02-.2-.04-.4-.17-.57v-1.8c.08-.1.1-.2.11-.33a8.3 8.3 0 015.6-6.67c.98-.37 2-.51 3.04-.51h1.78a367.41 367.41 0 01.94 0c.47-2.9 1.73-5.39 3.82-7.4 2.1-2.03 4.64-3.21 7.48-3.67a1.95 1.95 0 01.04-.1c.03-.06.04-.1.04-.14.97-4.56 3.78-7.37 8.23-8.62.23-.06.45-.1.68-.12.31-.04.62-.08.9-.2zm16.9 33.49h.01c1.08 0 2.14.02 3.2-.03a4.91 4.91 0 004.66-4.83 5 5 0 00-4.36-4.8c-1.37-.21-1.83-.7-1.91-2.06a9.3 9.3 0 00-.37-2.28c-1.25-3.82-3.9-6-7.8-6.75-1.17-.23-1.72-.81-1.74-2.02a7.24 7.24 0 00-.2-1.65 7.52 7.52 0 00-8.04-5.5 7.34 7.34 0 00-6.75 7.09c-.03 1-.7 1.95-1.94 1.95-.64 0-1.27.11-1.89.25a9.58 9.58 0 00-7.53 9.04c-.03 1.18-.74 1.87-1.92 1.89H9c-.54 0-1.08 0-1.58.14a4.84 4.84 0 00-3.64 3.43A4.5 4.5 0 005.02 32a5.18 5.18 0 003.83 1.5l4.16-.01 4.17-.01h.1c.14 0 .3.02.48-.13v-7.73c0-.69.07-1.35.31-1.99a5.24 5.24 0 014.96-3.37c1.04-.02 2.08-.01 3.13 0h16.39c1 0 1.98.16 2.85.67a5.1 5.1 0 012.69 4.72v7.28c0 .17 0 .35.1.55h1.37zm-8.95 17.38h-.08c-.16-.02-.28-.03-.4-.02-.8.02-1.4-.3-1.74-1.03-.33-.75-.16-1.41.37-2.03l2.68-3.16.01-.02 2.7-3.18c.28-.31.4-.65.4-1.06l-.01-11.6v-1.08-2.14c-.02-1.05-.67-1.68-1.73-1.73H23.4c-.2 0-.4 0-.59.02-.9.1-1.48.71-1.52 1.6V48.9l.01 2.2c.02.69.38 1.15.99 1.44.3.12.62.14.93.14h16.92c.15.02.31.03.46-.1.05-.57.06-1.1.01-1.71zm5.7-6.5l-.57.68-2.2 2.6c.6.76.65.91.65 1.84v5.05a2.84 2.84 0 002.19 2.76c.49.13.98.11 1.49.1l.56-.02v-.65a688.33 688.33 0 010-2.34v-4.68c0-.76.01-1.51.68-2.05l-2.44-2.86-.35-.43z"
                                    />
                                </svg>
                                <p class="uploadFile__paragraph">
                                    {this.$slots.default ? this.$slots.default : 'Выберите файл или перетащите нужный в выделенную область'}
                                </p>
                            </div>
                        )}

                        {(this.isFileLoaded === false || this.multiple) && (
                            <form class="uploadFile__form" onSubmit={e => e.preventDefault()}>
                                <input
                                    type="file"
                                    ref="input"
                                    class="uploadFile__input"
                                    accept={`.${this.allowedTypes.join(', .')}`}
                                    multiple={this.multiple === true}
                                    onChange={e => this.uploadFiles(e.target.files)}
                                    disabled={this.disabled}
                                />
                                <btn
                                    class={`uploadFile__button btn--green ${this.isUploading && 'btn--isUploading'}`}
                                    onClick={() => this.$refs.input.click()}>
                                    {this.$slots.button ? this.$slots.button : 'Выбрать'}
                                </btn>

                                {this.internalError &&
                                <div class="uploadFile__errorMessage"
                                     title={this.internalError.errors.file}>{this.errorMessage}</div>}
                            </form>
                        )}
                    </div>
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .uploadFile {

        &--disabled {
            opacity: .5;
            pointer-events: none;
        }

        &__label {
            display: block;
            margin-bottom: 4px;
            color: #747678;
            line-height: 1.2;
            font-size: 12px;
            font-weight: 400;
        }

        &__dropArea {
            margin: 0 0 18px;
            padding: 20px;
            width: 480px;
            background-color: $crmColor;
            border: 1px dashed $mainGreen;
            border-radius: 6px;
            transition: box-shadow 0.12s ease;
        }

        &__dropArea.highlight {
            box-shadow: inset 1px 1px 6px 0 rgba(0, 0, 0, 0.25);
        }

        &__preview {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0 35px 12px 0;
            margin: 0 0 12px;

            border-bottom: 1px solid $gray;
            font-size: 15px;
            line-height: 1.3;

            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }
        }

        &__previewIcon {
            display: block;
            width: 36px;
            height: 47px;
            flex-shrink: 0;
            margin: 0 20px 0 0;

            fill: $mainGreen;
        }

        &__name {
            padding: 0;
            margin: 0;
            align-self: center;

            text-align: left;
        }

        &__deleteBtn {
            position: absolute;
            top: 0;
            right: 0;
            width: 25px;
            height: 25px;

            padding: 0;
            margin: 0;

            background: transparent;
            cursor: pointer;
            outline: none;
            font-size: 20px;
            line-height: 1;
            color: rgba(0, 0, 0, .6);

            &:hover {
                color: $red;
            }
        }

        &__form {
            display: flex;
            align-items: center;
            margin-top: 30px;
        }

        &__errorMessage {
            color: $red;
            font-size: $sxs-font-size;
        }

        &__empty {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        &__icon {
            width: 47px;
            height: 47px;
            flex-shrink: 0;
            margin: 0 20px 0 0;

            fill: $mainGreen;
        }

        &__paragraph {
            padding: 0;
            margin: 0;

            text-align: left;
            font-size: 15px;
            line-height: 1.3;
        }

        #gallery {
            margin-top: 10px;
        }

        #gallery img {
            width: 150px;
            margin-bottom: 10px;
            margin-right: 10px;
            vertical-align: middle;
        }

        &__button {
            position: relative;
            margin-right: 40px;

            &:after {
                content: '';
                position: absolute;
                left: calc(100% + 15px);
                top: calc(50% - 8px);

                width: 16px;
                height: 16px;

                border: 2px solid transparent;
                border-bottom-color: $mainGreen;
                border-radius: 50%;
                opacity: 0;
                box-sizing: border-box;
            }

            &.btn--isUploading:after {
                animation: roll 1s linear infinite;
                opacity: 1;

                transition: opacity 0.12s 0.3s ease;
            }

            @keyframes roll {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }

        &__input {
            display: none;
        }
    }
</style>
