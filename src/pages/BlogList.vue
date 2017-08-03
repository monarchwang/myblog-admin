<template>
    <div>
        <Alert type="success" show-icon closable>
            博客管理
            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
            <template slot="desc">在此处可以查看到所有博客列表，<a @click="gotoWriteBlog">点我创建</a>新博客</template>
        </Alert>
        <div class="blog-table">
            <Table :data="tableData" :columns="tableColumns" stripe></Table>
        </div>
        <div class="pagination">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../api/index'
    export default {
        data () {
            return {
                tableData: [],
                tableColumns: [
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '简介',
                        key: 'brief',
                        width: 600
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status === 0 ? 'blue' : 'green';
                            const text = row.status === 0 ? '草稿' : '已发布';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '浏览量',
                        key: 'viewNumber'
                    },
                    {
                        title: '评论数',
                        key: 'commentNumber'
                    },
                    {
                        title: '标签',
                        key: 'tags',
                        render: (h, params) => {
                            return h('div', {}, params.row.tags.join(","))
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                            this.showBlogDetail(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                totalNum: 0,
                currentPage: 0,
                pageSize: 10
            }
        },
        mounted(){
            this.queryData(this.currentPage);
        },
        methods: {
            queryData (pageNum) {
                Api.queryBlogList(pageNum, this.pageSize).then(response => {
                    this.tableData = response.data.rows;
                    this.totalNum = response.data.total;
                }).catch(error => {
                    this.$Message.error(error.message);
                })
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                this.currentPage = pageNum;
                this.tableData = this.queryData(pageNum);
            },
            showBlogDetail (index) {
                this.$router.push(`/blog/${this.tableData[index].id}`);
            },
            remove (index) {
                this.tableData.splice(index, 1);
            },
            gotoWriteBlog(){
                this.$router.push('/writeblog')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        margin: 1rem auto;
    }
</style>
