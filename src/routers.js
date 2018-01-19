import Blog from './pages/Blog.vue'
import BlogList from './pages/BlogList.vue'
import BlogDetail from './pages/BlogDetail.vue'
import Tag from './pages/Tag.vue'
import WriteBlog from './pages/WriteBlog.vue'
import Login from './pages/Login.vue'


const routers = [
    {
        path: '/',
        redirect: '/blog'
    }, {
        path: '/blog',
        component: Blog,
        children: [
            {
                path: '/',
                component: BlogList
            },
            {
                path: 'edit/:id',
                component: WriteBlog
            },
            {
                path: ':id',
                component: BlogDetail
            }
        ]
    }, {
        name: 'tags',
        path: '/tags',
        component: Tag
    }, {
        name: "writeblog",
        path: '/writeblog',
        component: WriteBlog
    }, {
        name: 'login',
        path: '/login',
        component: Login
    }
];

export default routers;
