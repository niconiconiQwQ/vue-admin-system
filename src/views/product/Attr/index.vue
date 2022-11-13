<template>
  <div>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      style="margin-bottom: 20px"
    >
      <div slot="header">
        <span></span>
      </div>
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-button type="primary" size="default" @click="" icon="el-icon-plus"
      >添加属性</el-button
    >
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-table border stripe :data="attrList">
        <el-table-column
          type="index"
          prop="col"
          label="序号"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>
        <el-table-column
          prop="attrValueList"
          label="属性值列表"
          width="col.width"
        >
          <template slot-scope="{ row, $index }">
            <el-tag
              type="danger"
              size="normal"
              v-for="attrVal in row.attrValueList"
              :key="attrVal.id"
              style="margin-right: 20px"
              >{{ attrVal.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="col" label="操作" width="150">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="header">
        <span></span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "attr",
  data() {
    return {
      attrList: [],
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId(list) {
      this.attrList = list;
    },
  },
};
</script>
<style></style>
