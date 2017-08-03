<template>
    <div>
        <Card :bordered="false">
            <div class="blog clearfix">
                <div class="title">
                    <Input v-model="blog.title">
                    <span slot="prepend">文章标题</span>
                    </Input>
                </div>
                <div class="tags">
                    <template>
                        <Tag v-for="item in blog.tags" :key="item" :name="item" closable @on-close="removeTag">{{ item
                            }}
                        </Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="showAddTagModel">添加标签
                        </Button>
                    </template>
                </div>
                <div class="content">
                    <div id="editor" style="min-height:450px;"></div>
                </div>
                <div class="options">
                    <Button type="primary" @click="releaseBlog" icon="paper-airplane">发布</Button>
                    <Button type="success" @click="saveBlog" icon="ios-folder">保存</Button>
                    <Button type="error" @click="cancelWriteBlog" icon="ios-trash">取消</Button>
                </div>
            </div>
        </Card>


        <!--模态框---添加标签-->
        <Modal v-model="showSelectTagModel" width="400">

            <span slot="header" style="color: #666">
                <Icon type="information-circled"></Icon>
                <span>添加标签</span>
            </span>


            <Select v-model="blog.tags" filterable multiple>
                <Option v-for="item in allTags" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>

            <div slot="footer">
                <Button type="info" size="large" long @click="showSelectTagModel=false">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
    import WangEditor from 'wangeditor';
    import Emotion from '../emotions';
    import Api from '../api/index';
    export default {
        name: 'WriteBlog',
        data () {
            return {
                dataInterface: {
                    editorUpImgUrl: 'http://localhost:9090/blog/upload'  // 编辑器插入的图片上传地址
                },
                editor: '',  // 存放实例化的wangEditor对象，在多个方法中使用
                blog: {
                    id: -1,
                    title: '',
                    tags: [],
                    content: '',
                    brief: '',
                    tagIds: [],
                },
                showSelectTagModel: false,
                allTags: [],
            }
        },
        mounted(){
            this.createEditor();
            this.getAvailableTags();
        },
        beforeDestroy(){
            this.destroyEditor();
        },
        methods: {
            createEditor () {
                this.editor = new WangEditor('editor');
                this.initEditorConfig();  // 初始化编辑器配置，在create之前
                this.editor.create();  // 生成编辑器
                this.editor.$txt.html('<p>要初始化的内容</p>');  // 初始化内容
            },
            destroyEditor (){
                if (this.editor) {
                    this.editor.destroy();
                    this.editor = null;
                }
            },
            initEditorConfig(){
                // 初始化编辑器配置

                this.editor.config.emotions = {
                    'weibo': {
                        title: "微博",
                        data: Emotion.sina_emotion
                    },
                    "qq": {
                        title: "QQ",
                        data: Emotion.qq_motion
                    },
                    "斗图": {
                        title: "斗图",
                        data: Emotion.expression
                    }
                };

                this.editor.config.menus = [
                    'source', '|',
                    'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
                    'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
                    'link', 'unlink', 'table', 'emotion', 'img', 'insertcode', '|',
                    'undo', 'redo', 'fullscreen'
                ];
                this.editor.config.menuFixed = false;
                this.editor.config.uploadImgUrl = this.dataInterface.editorUpImgUrl;  // 图片上传地址
                this.editor.config.uploadImgFileName = 'file';  // 统一指定上传的文件name，需要指定。否则默认不同的上传方式是不同的name
                const usersecret = window.localStorage.getItem('usersecret');  // 获取 usersecret
                this.editor.config.uploadParams = {  // 自定义上传参数配置
                    usersecret: usersecret
                };

            },
            getEditorContent(tag){  // 获取编辑器 内容区内容
                if (!tag || tag === 'html') {
                    return this.editor.$txt.html();  // 获取 html 格式
                } else if (tag === 'txt') {
                    return this.editor.$txt.formatText();
                }
            },
            showAddTagModel(){
                if (this.allTags && this.allTags.length > 0)
                    this.showSelectTagModel = true;
                else
                    this.$Message.info("木有找到可用的标签哦~");
            },
            removeTag (event, name) {
                const index = this.blog.tags.indexOf(name);
                this.blog.tags.splice(index, 1);
            },
            getAvailableTags(){
                Api.getAvailableTags().then(response => {
                    this.allTags = response.data.rows;
                }).catch(error => {
                    this.$Message.error(error.message)
                });
            },
            fillInBlog(){
                this.blog.content = this.getEditorContent('html');
                if (!this.blog.title && !this.blog.content.trim()) {
                    this.$Message.error('啥也没有，搞个蛋蛋啊');
                    return -1;
                }
                if (!this.blog.title.trim()) {
                    this.$Message.error('骚年，忘了输标题吧');
                    return -1;
                }
                if (!this.getEditorContent('txt').trim()) {
                    this.$Message.error('小伙子，总得给点内容吧');
                    return -1;
                }
                //设置文章简介
                this.blog.brief = this.getEditorContent('txt').trim().substring(0, 150);
                //设置标签id
                this.allTags.map((val, index, arr) => {
                    if (val && this.blog.tags.indexOf(val.name) >= 0) {
                        this.blog.tagIds.push(val.id);
                    }
                });
                return 0;
            },
            releaseBlog(){
                if (this.fillInBlog() !== 0)
                    return;
                //发布博客
                Api.releaseBlog(this.blog).then(response => {
                    this.$Message.success('发布成功');
                    this.blog.id = response.data;
                }).catch(error => {
                    this.$Message.error(error.message);
                })


            },
            saveBlog(){
                this.fillInBlog();
                //保存博客
                Api.saveBlog(this.blog).then(response => {
                    this.$Message.success('保存成功');
                    //保存成功后返回blog id
                    this.blog.id = response.data;
                })
            },
            cancelWriteBlog(){
                //取消写博客

            }
        }
    }
</script>

<style lang="scss" scoped>
    .blog {
        position: relative;
        padding: 10px 10px 0;
        .tags, .content {
            margin-top: 10px;
        }
        .options {
            margin-top: 10px;
            float: right;
        }
    }
</style>
