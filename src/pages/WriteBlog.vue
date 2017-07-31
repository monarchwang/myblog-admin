<template>
	<div>
		<h1>WriteBlog Page</h1>
		<div id="editor" style="height:400px;max-height:500px;"></div>
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
					"qq":{
						title:"QQ",
						data: Emotion.qq_motion
					},
					"斗图":{
						title:"斗图",
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
		}
	}
</script>

<style lang="scss" scoped>

</style>
