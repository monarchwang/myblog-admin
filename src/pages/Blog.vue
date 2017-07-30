<template>
  <div>


	<el-table
			:data="tableData"
			style="width: 100%">
	  <el-table-column
			  prop="date"
			  label="日期"
			  width="180">
	  </el-table-column>
	  <el-table-column
			  prop="name"
			  label="姓名"
			  width="180">
	  </el-table-column>
	  <el-table-column
			  prop="address"
			  label="地址">
	  </el-table-column>
	  <el-table-column label="操作">
		<template scope="scope">
		  <el-button
				  size="small"
				  @click="handleEdit(scope.$index, scope.row)">编辑
		  </el-button>
		  <el-button
				  size="small"
				  type="danger"
				  @click="handleDelete(scope.$index, scope.row)">删除
		  </el-button>
		</template>
	  </el-table-column>
	</el-table>

	<div class="pagination">
	  <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage4"
			  :page-sizes="[100, 200, 300, 400]"
			  :page-size="100"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="400">
	  </el-pagination>
	</div>
  </div>
</template>

<script>
  export default {
	data() {
	  return {
		name: 'blog',
		tableData: [{
		  date: '2016-05-02',
		  name: '王小虎',
		  address: '上海市普陀区金沙江路 1518 弄'
		}, {
		  date: '2016-05-04',
		  name: '王小虎',
		  address: '上海市普陀区金沙江路 1517 弄'
		}, {
		  date: '2016-05-01',
		  name: '王小虎',
		  address: '上海市普陀区金沙江路 1519 弄'
		}, {
		  date: '2016-05-03',
		  name: '王小虎',
		  address: '上海市普陀区金沙江路 1516 弄'
		}],
		currentPage1: 5,
		currentPage2: 5,
		currentPage3: 5,
		currentPage4: 4
	  }
	},
	methods: {
	  handleEdit(index, row) {
		console.log(index, row);
	  },
	  handleDelete(index, row) {
		console.log(index, row);
	  },
	  handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
	  },
	  handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
	  }
	}
  }
</script>


<style lang="scss" scoped>

  .pagination{
	margin: 2rem auto;
  }
</style>
