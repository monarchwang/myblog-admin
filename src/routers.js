import Blog from './pages/Blog.vue'
import Tag from './pages/Tag.vue'
import WriteBlog from './pages/WriteBlog.vue'

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
  }, {
	path: '/writeblog',
	component: WriteBlog
  }
];

export default routers;
