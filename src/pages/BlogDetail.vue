<template>

    <Card class="blog-detail">
        <div style="text-align:center">
            <img src="../assets/logo.png">
            <h3>BlogDetail--------{{$route.params.id}}</h3>
        </div>
    </Card>
</template>

<script>
    export default {
        name: 'BlogDetail',
        data () {
            return {
                msg: 'Welcome to Vue.js App'
            }
        },
        methods: {
            hello () {
                console.log('Hello');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .blog-detail{
        width: 900px;
        margin: 20px auto;
    }
</style>
