<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 
  data 是表格组件将来需要展示的数据-数组类型
  border：给表格添加边框
 -->
    <el-table style="width: 100%" border>
      <!-- column 属性 
       label：显示的标题;width:对应列的宽度；align：标题对齐的方式

      -->
      <el-table-column prop="col.id" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="col.id" label="品牌名称" width="col.width">
      </el-table-column>
      <el-table-column prop="col.id" label="品牌logo" width="col.width">
      </el-table-column>
      <el-table-column prop="col.id" label="操作" width="col.width">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 
       @size-change="sizeChange"
      @current-change="currentChange"
     -->
    <el-pagination
      :current-page="2"
      :page-sizes="[3, 5, 10]"
      :page-size="3"
      :total="99"
      layout="prev, pager, next, jumper,->,total,sizes"
      background
      style="margin-top: 20px; text-align: center"
    >
      :pager-count="7">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1, // 第几页
      limit: 3, // 一页几条数据
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const { page, limit } = this;
      // 获取品牌列表接口
      let res = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      console.log(res);
    },
  },
};
</script>
<style></style>
