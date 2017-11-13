<template>

	<Card class="blog-detail">

		<div style="text-align:center">
			<div class="title">
				{{blog.title}}
			</div>
			<div class="options">
				<!--操作-->
				<Button-group vertical>
					<Button v-if="blog.status ==0" @click="releaseBlog" type="ghost" icon="paper-airplane"></Button>
					<Button type="ghost" @click="editBlog" icon="edit"></Button>
					<Button type="ghost" @click="deleteBlog" icon="ios-trash"></Button>
					<Button type="ghost" @click="backToList" icon="ios-undo-outline"></Button>
				</Button-group>
			</div>
			<div v-html="blog.content" class="content"></div>
		</div>
	</Card>
</template>

<script>
	import Api from '../api/index'

	export default {
		name: 'BlogDetail',
		data () {
			return {
				blog: {}
			}
		},
		mounted(){
			Api.queryBlogDetail(this.$route.params.id).then(response => {
				this.blog = response.data;
			}).catch(error => {
				this.$Message.error(error.message);
			})
		},
		methods: {
			backToList(){
				this.$router.back();
			},
			editBlog(){
				this.$router.push({path: `/blog/edit/${this.blog.id}`});
			},
			releaseBlog(){
				Api.setBlogStatusRelease(this.$route.params.id).then(response => {
					this.blog = response.data;
					this.$Message.success('发布成功!');
					this.backToList();
				}).catch(error => {
					this.$Message.error(error.message);
				})
			},
			deleteBlog(){
				this.$Modal.confirm({
					title: '系统提示',
					content: '<p>确认删除？</p>',
					onOk: () => {
						Api.deleteBlog(this.blog.id).then(response => {
							this.$Message.success('删除成功!');
							this.backToList();
						}).catch(error => {
							this.$Message.error(error.message);
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blog-detail {
		max-width: 60%;
		margin: 20px auto;
		color: #333;
		position: relative;
		.options {
			position: fixed;
			left: 80%;
		}
		.title {
			margin: 20px 0 0;
			font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
			font-size: 34px;
			font-weight: 700;
			line-height: 1.3;
		}
		.content {
			color: #2f2f2f;
			margin-top: 20px;
			font-size: 16px;
			font-weight: 400;
			line-height: 1.7;
		}
	}
</style>
