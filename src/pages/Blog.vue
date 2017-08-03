<template>
    <div class="container">

        <router-view></router-view>

    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            gotoWriteBlog(){
                this.$router.push('/writeblog')
            }
        }
    }
</script>

<style lang="scss" scoped>

    .container {

    }


</style>