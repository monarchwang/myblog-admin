<template>
  <div id="app">

	<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
	  <el-menu-item index="1">博客管理</el-menu-item>
	  <el-menu-item index="2">标签管理</el-menu-item>
	  <el-menu-item index="3">归档管理</el-menu-item>
	  <el-menu-item index="4" class="f-r m-r-md">设置</el-menu-item>
	</el-menu>

	<div class="container">
	  <router-view></router-view>
	</div>


  </div>
</template>

<script>
  export default {
	name: 'app',
	data () {
	  return {
		msg: 'Welcome to Your Vue.js App',
		activeIndex: '1',
		routers: ['blog', 'tag', 'storage']
	  }
	},
	mounted (){
	  let href = location.href;
	  this.routers.map( (value, index) => {
		if (href.indexOf(value) > 0) {
		  this.activeIndex = (index + 1)+"" ;
		  console.log(this.activeIndex)
		}
	  })
	},
	methods: {
	  handleSelect(key, keyPath) {
		this.$router.push(this.routers[key - 1]);

	  }
	}
  }
</script>

<style lang="scss">
  * {
	margin: 0;
	padding: 0;
  }

  #app {
	.el-menu-demo {
	  padding-left: 10%;
	}
	.container {
	  width: 80%;
	  border: solid 1px #ff00ff;
	  height: 800px;
	  margin: 0 auto;
	}

  }

  .clearfix {
	_zoom: 1;
	&:after {
	  content: '';
	  clear: both;
	  width: 0;
	  height: 0;
	  display: block;
	  visibility: hidden;
	}
  }

  .f-r {
	float: right !important;
  }

  .m-r-md {
	margin-right: 10% !important;
  }
</style>
