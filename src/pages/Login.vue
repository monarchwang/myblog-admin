<template>
    <div class="container">

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
                    user: [
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
                            this.$Message.success('登陆失败!');
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
        width: 60%;
        margin: 50px auto;
    }
</style>