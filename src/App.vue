<template>
    <div class="layout">
        <Menu mode="horizontal" theme="light" :active-name="active" @on-select="handleSelect">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="blog">
                    <Icon type="document-text"></Icon>
                    博客管理
                </Menu-item>
                <Menu-item name="tags">
                    <Icon type="ios-pricetags"></Icon>
                    标签管理
                </Menu-item>
                <Menu-item name="statistics">
                    <Icon type="ios-pie"></Icon>
                    数据统计
                </Menu-item>
                <Menu-item name="setting">
                    <Icon type="gear-b"></Icon>
                    设置
                </Menu-item>
                <Menu-item name="writeblog">
                    <Icon type="edit"></Icon>
                    写博客
                </Menu-item>
            </div>
        </Menu>
        <div class="layout-content">
            <router-view></router-view>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; Monarchwang
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                active: ""
            }
        },
        mounted (){
            let href = location.href;
            this.active = href.substring(href.lastIndexOf("/") + 1, href.length);
        },
        methods: {
            handleSelect (name) {
                this.$router.push(`/${name}`);
            }
        },

    }
</script>

<style lang="scss" scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        overflow-x: hidden;

        .layout-logo {
            width: 100px;
            height: 30px;
            background: #5b6270;
            border-radius: 3px;
            float: left;
            position: relative;
            top: 15px;
            left: 20px;
        }
        .layout-nav {
            width: 600px;
            margin: 0 auto;
        }

        .layout-content {
            min-height: 600px;
            margin: 15px;
            overflow: hidden;
            border-radius: 4px;
            .layout-content-main {
                padding: 10px;
            }

        }

        .layout-copy {
            height: 60px;
            text-align: center;
            padding: 10px 0 20px;
            color: #9ea7b4;
        }
    }
</style>