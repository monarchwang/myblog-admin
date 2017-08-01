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
                        <Tag v-for="item in blog.tags" :key="item" :name="item" closable @on-close="removeTag">{{ item }}</Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="showSelectTagModel=true">添加标签</Button>
                    </template>
                </div>
                <div class="content">
                    <div id="editor" style="min-height:450px;"></div>
                </div>
                <div class="options">
                    <Button type="primary" icon="paper-airplane">发布</Button>
                    <Button type="success" icon="ios-folder">保存</Button>
                    <Button type="error" icon="ios-trash">取消</Button>
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
                <Option v-for="item in allTags" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>

            <div slot="footer">
                <Button type="info" size="large" long @click="showSelectTagModel=false">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
    import WangEditor from 'wangeditor';
    import Emotion from '../emotions'
    export default {
        name: 'WriteBlog',
        data () {
            return {
                dataInterface: {
                    editorUpImgUrl: 'http://xxxx'  // 编辑器插入的图片上传地址
                },
                editor: '',  // 存放实例化的wangEditor对象，在多个方法中使用
                blog: {
                    title: '',
                    tags: [],
                    content: ''
                },
                showSelectTagModel: false,
                allTags: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
            }
        },
        mounted(){
            this.createEditor();
            console.log("this.editor----->", this.editor)
        },
        beforeDestroy(){
            this.destoryEditor();
        },
        methods: {
            createEditor () {
                this.editor = new WangEditor('editor');
                this.initEditorConfig();  // 初始化编辑器配置，在create之前
                this.editor.create();  // 生成编辑器
                this.editor.$txt.html('<p>要初始化的内容</p>');  // 初始化内容
            },
            destoryEditor (){
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
                this.editor.config.uploadImgFileName = '_img';  // 统一指定上传的文件name，需要指定。否则默认不同的上传方式是不同的name
                const usersecret = window.localStorage.getItem('usersecret');  // 获取 usersecret
                this.editor.config.uploadParams = {  // 自定义上传参数配置
                    usersecret: usersecret
                };

            },
            getEditorContent(){  // 获取编辑器 内容区内容
                this.editorContent = this.editor.$txt.html();  // 获取 html 格式
                this.editor.$txt.text();  // 获取纯文本
                this.editor.$txt.formatText();  // 获取格式化后的纯文本

            },
            removeTag (event, name) {
                const index = this.blog.tags.indexOf(name);
                this.blog.tags.splice(index, 1);
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
