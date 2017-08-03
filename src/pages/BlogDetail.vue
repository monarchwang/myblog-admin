<template>

    <Card class="blog-detail">

        <div style="text-align:center">
            <div class="title">
                {{blog.title}}
            </div>
            <div class="options">
                <!--操作-->
                <Button-group vertical>
                    <Button v-if="blog.status ==0" type="ghost" icon="paper-airplane"></Button>
                    <Button type="ghost" icon="edit"></Button>
                    <Button type="ghost" icon="ios-trash"></Button>
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
            hello () {
                console.log('Hello');
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
            left:80%;
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
