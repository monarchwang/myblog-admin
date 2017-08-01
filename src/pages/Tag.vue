<template>
	<div class="container">
		<Alert show-icon closable>
			标签管理
			<Icon type="ios-lightbulb-outline" slot="icon"></Icon>
			<template slot="desc">在此处管理所有的文章标签，<a @click="openModel">点我创建</a>标签(或使用快捷键m)</template>
		</Alert>
		<Table :data="tableData" :columns="tableColumns" stripe></Table>
		<div class="pagination">
			<div style="float: right;">
				<Page :total="100" :current="1" @on-change="changePage"></Page>
			</div>
		</div>

		<!--模态框---新增标签-->
		<Modal
				v-model="showCreateTagModel"
				width="400"
				@on-cancel="cancel">

            <span slot="header" style="color: #666">
                <Icon type="information-circled"></Icon>
                <span>新增标签</span>
            </span>

			<Form ref="formInline" :model="formInline" :rules="ruleInline" style="margin-top: 15px">
				<Form-item prop="name">
					<Input type="text" v-model="formInline.name" placeholder="标签名称">
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
						key: 'articleSum'
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
											this.show(params.index)
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
				}
			}
		},
		mounted(){
			this.queryData(0, 10);
			document.onkeydown = (e) => {
				let keyCode = e.keyCode || e.which || e.charCode;
				//快捷键m打开模态框
				if (keyCode === 77) {
					this.openModel();
				}
			}
		},
		methods: {
			queryData (pageNum, pageSize) {
				Api.queryTag(pageNum, pageSize).then(function (response) {
					console.log('请求到数据------>', response)
				}).catch(error => {
					console.log('发生异常----->', error)
					this.$Message.error(error.message);
				});
			},
			changePage () {
				// 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
				this.tableData = this.mockTableData();
			},
			show (index) {
				this.$Modal.info({
					title: '标签信息',
					content: `姓名：${this.tableData[index].name}<br>状态：${this.tableData[index].status}<br>文章数目：${this.tableData[index].article.length}`
				})
			},
			disableTag(index){
				//启用或禁用tag
				let number = this.tableData[index].status;
				if (number === 0) {
					this.tableData[index].status = 1;
				} else {
					this.tableData[index].status = 0;
				}

			},
			deleteTag (index) {
				//TODO 删除标签
				this.tableData.splice(index, 1);
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

						//TODO 提交标签数据

						this.$Message.success('提交成功!');
						this.showCreateTagModel = false;

					} else {
						this.$Message.error('表单验证失败!');
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