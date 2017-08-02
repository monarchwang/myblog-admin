<template>
	<div class="container">
		<Alert show-icon closable>
			标签管理
			<Icon type="ios-lightbulb-outline" slot="icon"></Icon>
			<template slot="desc">在此处管理所有的文章标签，<a @click="openModel">点我创建</a>标签(或使用快捷键m)</template>
		</Alert>
		<Table :data="tableData" :columns="tableColumns" stripe></Table>
		<div class="pagination">
			<div style="float: right;" v-show="totalNum > pageSize ">
				<Page :total="totalNum" :current="currentPage" :pageSize="pageSize" @on-change="changePage"></Page>
			</div>
		</div>

		<!--模态框---新增标签-->
		<Modal v-model="showCreateTagModel" width="400" @on-cancel="cancel">

            <span slot="header" style="color: #666">
                <Icon type="information-circled"></Icon>
                <span>新增标签</span>
            </span>

			<Form ref="formInline" :model="formInline" :rules="ruleInline" style="margin-top: 15px">
				<Form-item prop="name">
					<Input type="text" v-model="formInline.name" placeholder="标签名称" :autofocus="true">
					<Icon type="ios-pricetag" slot="prepend"></Icon>
					</Input>
				</Form-item>
			</Form>

			<div slot="footer">
				<Button type="info" size="large" long :loading="modalLoading" @click="handleSubmit('formInline')">确定
				</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Api from '../api/index'
	export default {
		data () {
			return {
				showCreateTagModel: false,
				tableData: [],
				tableColumns: [
					{
						title: '标签ID',
						key: 'id'
					},
					{
						title: '标签名称',
						key: 'name'
					},
					{
						title: '标签状态',
						key: 'status',
						render: (h, params) => {
							const row = params.row;
							const color = row.status === 1 ? 'green' : 'red';
							const text = row.status === 1 ? '启用' : '禁用';

							return h('Tag', {
								props: {
									type: 'dot',
									color: color
								}
							}, text);
						}
					},
					{
						title: '文章数',
						key: 'articleNum'
					},
					{
						title: '创建时间',
						key: 'createTime'
					},
					{
						title: '操作',
						key: 'action',
						width: 200,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.showTagDetail(params.index)
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										type: this.tableData[params.index].status === 1 ? 'warning' : "success",
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.disableTag(params.index)
										}
									}
								}, this.tableData[params.index].status === 1 ? '禁用' : '启用'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.$Modal.confirm({
												title: '系统提示',
												content: '<p>确认删除？</p>',
												onOk: () => {
													this.deleteTag(params.index);
												}
											});
										}
									}
								}, '删除')
							]);
						}
					}
				],
				modalLoading: false,
				formInline: {
					name: '',
				},
				ruleInline: {
					name: [
						{required: true, message: '请填写标签名', trigger: 'blur'}
					]
				},
				totalNum: 0,
				currentPage: 1,
				pageSize: 10
			}
		},
		mounted(){
			this.queryData(this.currentPage);
			document.onkeydown = (e) => {
				let keyCode = e.keyCode || e.which || e.charCode;
				//快捷键m打开模态框
				if (keyCode === 77) {
					this.openModel();
				}
			}
		},
		methods: {
			queryData (pageNum) {
				Api.queryTag(pageNum, this.pageSize).then((response) => {
					this.tableData = response.data.rows;
					this.totalNum = response.data.total;
				}).catch(error => {
					this.$Message.error(error.message);
				});
			},
			changePage (pageNum) {
				this.pageNum = pageNum;
				this.tableData = this.queryData(pageNum);
			},
			showTagDetail (index) {
				this.$Modal.info({
					title: '标签信息',
					content: `姓名：${this.tableData[index].name}<br>状态：${this.tableData[index].status}<br>文章数目：${this.tableData[index].articleNum}`
				})
			},
			disableTag(index){
				//TODO 启用或禁用tag
				let number = this.tableData[index].status;
				let id = this.tableData[index].id;
				let status = -1;

				let msg = '';
				if (number === 0) {
					status = 1;
					msg = '启用标签成功';
				} else {
					status = 0;
					msg = '禁用标签成功';
				}
				Api.updateTag({id: id, status: status}).then(response => {
					this.tableData[index].status = status;
					this.$Message.success(msg);
				}).catch(error => {
					this.$Message.error(error.message);
				});
			},
			deleteTag (index) {
				// 删除标签
                let id = this.tableData[index].id;
				Api.deleteTag(id).then(response=>{
                    this.$Message.success('删除标签成功');
                    this.tableData.splice(index, 1);
                }).catch(error=>{
                    this.$Message.error(error.message);
				});
			},

			openModel(){
				this.modalLoading = false;
				this.formInline.name = '';
				this.showCreateTagModel = true;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.modalLoading = true;
						//提交标签数据
						Api.createTag({tagName: this.formInline.name}).then((response) => {
                            this.$Message.success('提交成功!');
                            this.queryData(this.currentPage);
						}).catch(error => {
							this.$Message.error(error.message);
						});
						this.showCreateTagModel = false;
					}
				})
			},
			cancel(){
				this.$Message.info('点击了取消');
				this.modalLoading = false;

			}
		}
	}
</script>

<style lang="scss" scoped>

	.container {
		.pagination {
			margin: 1rem auto;
		}
	}


</style>