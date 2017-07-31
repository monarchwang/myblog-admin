import Blog from './pages/Blog.vue'
import Tag from './pages/Tag.vue'

const routers = [
    {
        path: '/',
        redirect: '/blog'
    }, {
        path: '/blog',
        component: Blog
    }, {
        path: '/tag',
        component: Tag
    }
];

export default routers;
