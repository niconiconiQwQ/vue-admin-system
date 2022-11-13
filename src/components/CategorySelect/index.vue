<template>
  <div>
    <el-form :model="cForm" :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CategorySelect",
  data: () => {
    return {
      list1: [],
      list2: [],
      list3: [],
      // 收集一二三级的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 平台属性的列表
      attrList: [],
    };
  },
  methods: {
    onSubmit() {},
    // 获取一级分类列表
    async getCategory1List() {
      let res = await this.$API.attr.reqCategory1List();
      if (res.code === 200) {
        this.list1 = res.data;
      }
    },
    // 选择一级分类时，发请求获取二级分类列表
    async handler1() {
      // 清空二三级数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      const { category1Id } = this.cForm;
      let res = await this.$API.attr.reqCategory2List(category1Id);
      if (res.code === 200) {
        this.list2 = res.data;
      }
    },
    // 选择一级分类时，发请求获取二级分类列表
    async handler2() {
      // 清除三级数据
      this.list3 = [];
      this.category3Id = "";
      const { category2Id } = this.cForm;
      let res = await this.$API.attr.reqCategory3List(category2Id);
      if (res.code === 200) {
        this.list3 = res.data;
      }
    },
    // 发请求，获取数据;获取平台属性的数据
    async handler3() {
      let res = await this.$API.attr.reqAttrList(this.cForm);
      if (res.code === 200) {
        this.attrList = res.data;
      }
      this.$emit("getCategoryId", this.attrList);
    },
  },
  created() {
    // 获取一级分类的数据
    this.getCategory1List();
  },
};
</script>
<style></style>
