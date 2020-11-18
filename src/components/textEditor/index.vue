<script>
    import tinymce from 'tinymce';
    import { clearHtmlComments } from '@/helpers/base';
    import path from 'path';

    export default {
        name: 'TextEditor',

        props: {
            value: {
                required: true,
            },
            required: {
                type: Boolean,
                required: false,
                default: false,
            },
            id: {
                type: String,
                required: true,
                default: '',
            },
            classList: {
                type: String,
            },
            error: {
                type: String,
                required: false,
                default: '',
            },
            uploadedImageDataProp: {
                type: String,
                required: false,
                default: 'images',
            },
            uploadImagePath: {
                type: String,
                required: false,
                default: 'content',
            },
            contentHeight: {
                type: String,
                required: false,
                default: '300',
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            params: {
                type: Object,
                default() {
                    return {};
                },
            },
        },

        mounted() {
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    let value = this.$refs[this.id];

                    let self = this;

                    this.tinymceOptions.images_upload_handler = function (blobInfo, success, failure) {
                        self.uploadImage(blobInfo.blob(), blobInfo.filename(), 'uploadedImageDataProp', 120, 120, success, failure);
                    };

                    tinymce.baseURL = '/tinymce';

                    let vm = this,
                        options = this.tinymceOptions; // use jquery temporary

                    // make an deep copy of options;should not modify tinymceOptions
                    options.selector = undefined;
                    options.target = value; // use options.target instand of options.selector
                    let oldSetup = options.setup || function () {};

                    options.setup = editor => {
                        //Decorate origni one
                        oldSetup(editor);

                        // Bind keyup
                        editor.on('keyup', function (e) {
                            // update model value;
                            let value = editor.getContent();
                            // Dom to model,this was a problem,when input in editor ? it will focus in the first line first word;
                            vm.$emit('input', value); // who recieve this event?
                        });

                        editor.on('blur', function () {
                            vm.allowSetContent = true;
                        });

                        editor.on('focus', function () {
                            vm.allowSetContent = false;
                        });

                        editor.on('SetContent', () => {
                            vm.$emit('input', editor.getContent());
                        });

                        editor.on('change', () => {
                            vm.$emit('input', editor.getContent());
                        });

                        editor.on('ExecCommand', function (e) {
                            setTimeout(function () {
                                vm.$emit('input', editor.getContent());
                            });
                        });

                        editor.on('ObjectResized', function (e) {
                            vm.$emit('input', editor.getContent());
                        });
                    };


                    tinymce.init(options).then(editors => {
                        vm.editor = editors[0];

                        if (typeof vm?.editor?.setContent === 'function') {
                            setTimeout(() => {
                                vm.editor.setContent(value.value);
                            });
                        }
                    });

                    this.isDataLoaded = true;
                }, 10);
            }
        },

        beforeDestroy() {
            let tinyMce = (tinymce || {}).get(this.id);

            if (tinyMce) {
                tinyMce.destroy();
            }
        },

        watch: {
            value: function (content) {
                content = clearHtmlComments(content);

                if (this.editor && this.allowSetContent) {
                    // setContent will let editor focus in first line and first world
                    this.editor.setContent(content);
                }
            },
        },

        data() {
            return {
                initialValue: '',
                data: {
                    images: [],
                },
                isDataLoaded: false,
                tinymceOptions: {
                    selector: 'textarea',
                    readonly: this.disabled ? 1 : 0,
                    relative_urls: false,
                    convert_urls: false,
                    remove_script_host: false,
                    height: this.contentHeight,
                    menubar: !this.disabled,
                    plugins: !this.disabled
                        ? [
                              'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                              'searchreplace wordcount visualblocks visualchars code fullscreen',
                              'insertdatetime media nonbreaking save table contextmenu directionality',
                              'emoticons template paste textcolor colorpicker textpattern codesample toc',
                          ]
                        : [],
                    toolbar1: !this.disabled
                        ? 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                        : '',
                    toolbar2: !this.disabled ? 'print preview media | forecolor backcolor emoticons | codesample' : '',
                    valid_elements: '*[*]',
                    //content_css: '/tinymce/skins/lightgray/codepen.css',
                    // skin_url: 'tinymce/skins/lightgray',
                    skin: false,
                    // theme_url: 'node_modules/tinymce/themes/modern/theme.js',
                    theme: 'modern',
                    images_upload_base_path: '/some/basepath',
                    images_upload_credentials: true,
                    image_title: true,
                    // enable automatic uploads of images represented by blob or data URIs
                    automatic_uploads: true,
                    // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                    images_upload_url: 'postAcceptor.php',
                    language: 'ru',
                    // here we add custom filepicker only to Image dialog
                    file_picker_types: 'image',
                    // and here's our custom image picker
                    file_picker_callback: function (cb, value, meta) {
                        let input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');

                        // Note: In modern browsers input[type="file"] is functional without
                        // even adding it to the DOM, but that might not be the case in some older
                        // or quirky browsers like IE, so you might want to add it to the DOM
                        // just in case, and visually hide it. And do not forget do remove it
                        // once you do not need it anymore.

                        input.onchange = function () {
                            let file = this.files[0];

                            let getBase64 = file => {
                                return new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
                                        if (encoded.length % 4 > 0) {
                                            encoded += '='.repeat(4 - (encoded.length % 4));
                                        }
                                        resolve(encoded);
                                    };
                                    reader.onerror = error => reject(error);
                                });
                            };

                            getBase64(file).then(fileBase64 => {
                                // Note: Now we need to register the blob in TinyMCEs image blob
                                // registry. In the next release this part hopefully won't be
                                // necessary, as we are looking to handle it internally.
                                let id = 'blobid' + new Date().getTime();
                                let blobCache = tinymce.activeEditor.editorUpload.blobCache;

                                let blobInfo = blobCache.create(id, file, fileBase64);
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name
                                cb(blobInfo.blobUri(), { title: file.name });
                            });
                        };

                        input.click();
                    },
                },
                destroyed: false,
            };
        },

        methods: {
            async imageInputChange(event) {
                let files = Array.from(event.target.files),
                    countFiles = files.length,
                    step = 0;

                for (let file of files) {
                    this.data['images'].push({});

                    await this.uploadImage(file);
                }

                this.$refs['images'].value = '';
                this.$refs['images'].disabled = false;
            },

            async uploadImage(file, fileName, dataProp, width, height, success, fail) {
                let fd = new FormData();

                fd.append('image', file, fileName);
                fd.append('w', width);
                fd.append('h', height);
                fd.append('temp', 'false');
                fd.append('path', this.uploadImagePath);

                dataProp = this[dataProp];

                if (Object.keys(this.params?.data || {}).length > 0 && this.params?.url && this.params?.method) {
                    await fetch(this.params.url, {
                        method: 'POST',
                        body: JSON.stringify(fd),
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                            accept: 'application/json, text/plain, */*',
                            ...this.params.headers,
                        },
                    })
                        .then(response => {
                            //let length = this[dataProp].length;

                            //this.$set(this[dataProp], length - 1, response.data);

                            this.$emit('imageUploaded', {
                                item: response.data,
                                dataProp: dataProp,
                            });

                            if (typeof success === 'function') {
                                success(response.data.imagePath);
                            }

                            setTimeout(() => {
                                this.editor.setContent(this.editor.getContent());
                            });
                        })
                        .catch(error => {
                            this.alert = Object.assign({}, this.alert, {
                                active: true,
                                state: 'alert--danger',
                                errors: error.response.data.errors,
                                message: error.response.data['message'],
                            });

                            if (typeof fail === 'function') {
                                fail(error);
                            }
                        });
                }

                // await this.$axios
                //     .post('common/uploadTempImage', fd, {
                //         onUploadProgress: itemUpload => {
                //             let loading = Math.round((itemUpload.loaded / itemUpload.total) * 100) + '%';
                //
                //             this.$emit('imageUploadProgress', {
                //                 item: itemUpload,
                //                 dataProp: dataProp,
                //                 progress: loading,
                //             });
                //         },
                //     })
                //     .then(response => {
                //         //let length = this[dataProp].length;
                //
                //         //this.$set(this[dataProp], length - 1, response.data);
                //
                //         this.$emit('imageUploaded', {
                //             item: response.data,
                //             dataProp: dataProp,
                //         });
                //
                //         if (typeof success === 'function') {
                //             success(response.data.imagePath);
                //         }
                //
                //         setTimeout(() => {
                //             this.editor.setContent(this.editor.getContent());
                //         });
                //     })
                //     .catch(error => {
                //         this.alert = Object.assign({}, this.alert, {
                //             active: true,
                //             state: 'alert--danger',
                //             errors: error.response.data.errors,
                //             message: error.response.data['message'],
                //         });
                //
                //         if (typeof fail === 'function') {
                //             fail(error);
                //         }
                //     });
            },
        },

        render() {
            return (
                <div class={`'form-group ${this.classList} ${this.error}`}>
                    <label for={this.id}>
                        {this.$slots.default}
                        {this.required && '*'}
                    </label>

                    <textarea ref={this.id} value={this.value} onInput={e => this.input(e)} disabled={this.disabled}>
                        {this.value}
                    </textarea>

                    {this.error && (
                        <div class="form-group__help" title={this.error}>
                            {this.error}
                        </div>
                    )}
                </div>
            );
        },
    };
</script>
