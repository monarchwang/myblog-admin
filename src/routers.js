import Blog from './pages/Blog.vue'
import BlogList from './pages/BlogList.vue'
import BlogDetail from './pages/BlogDetail.vue'
import Tag from './pages/Tag.vue'
import WriteBlog from './pages/WriteBlog.vue'


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
                path: ':id',
                component: BlogDetail
            }
        ]
    }, {
        path: '/tags',
        component: Tag
    }, {
        path: '/writeblog',
        component: WriteBlog
    }
];

export default routers;
