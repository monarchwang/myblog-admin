<template>
    <transition name="slide">

        <div class="container">
            <div class="main">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </transition>
</template>
<script>
    import Api from '../api/index'

    export default {
        data() {
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        Api.login(this.formInline).then((res) => {
                            sessionStorage.setItem('accessToken', res.data.accessToken);
                            sessionStorage.setItem('userName', res.data.username);
                            this.$Message.success('登陆成功!');
                            this.$router.push('/blog')
                        }).catch(err => {
                            this.$Message.error('登陆失败!');
                            console.log(err)
                        })

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #f6f6f6;
        overflow: hidden;
        .main{
            width: 400px;
            margin: 250px auto;
        }
    }

    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>