<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >
    <!-- 
  data 是表格组件将来需要展示的数据-数组类型
  border：给表格添加边框
 -->
    <el-table style="width: 100%" border :data="list">
      <!-- column 属性
       label：显示的标题;width:对应列的宽度；align：标题对齐的方式
       prop:对应列内容的字段名
       element 表格是以
      -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="col.width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="col.width">
        <!-- 这个row 是该行的数据(数据回传) $index 是行索引值 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="col.id" label="操作" width="col.width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" size="mini" @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,total,sizes"
      background
      style="margin-top: 20px; text-align: center"
    >
      :pager-count="7">
    </el-pagination>
    <!-- 对话框
    :visible.sync :控制对话框显示与影藏
    -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- model属性，作用：把表单的数据收集到哪个对象身上，将来表单验证也需要这个属性 
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      -->
      <el-form :model="tmForm" style="width: 80%" :rules="rules" ref="ruleForm">
        <el-form-item
          label="品牌名称"
          label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!-- 这里收集数据不能 使用v-model，因为不是表单元素
          action 是设置图片上传的地址
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      // value 为用户输入的值，callback表示放行
      if (value.length < 2 || value.length > 10) {
        callback(new Error("名称长度在2-10之间"));
      } else {
        callback();
      }
    };
    return {
      page: 1, // 第几页
      limit: 3, // 一页几条数据
      total: 0, // 总共数据条数
      list: [], // 列表展示的数据
      dialogFormVisible: false, // 对话框显示影藏的属性
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        // 品牌名称验证规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // 搞一个自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        // 品牌logo验证规则
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      // 获取品牌列表接口
      let res = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (res.code == 200) {
        // 数据总条数和列表展示的数据
        this.total = res.data.total;
        this.list = res.data.records;
      }
    },
    handleSizeChange(limit) {
      // 整理参数
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清空数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 修改某个品牌
    updateTradeMark(row) {
      // row 为当前用户选中的品牌的信息
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // res是上传成功之后服务器返回的数据
      this.tmForm.logoUrl = res.data;
    },
    // 上传图片之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确定按钮(添加或修改)
    addOrUpdateTradeMark() {
      // 当全部验证字段都通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          // 发请求(可能是添加 / 修改)
          let res = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (res.code === 200) {
            // 弹出信息；
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或修改品牌成功之后，再次获取品牌列表数据
            // 如果有id，即修改，停在当前页，否则第一页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌的操作
    deleteTradeMark(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定的时候触发
          // 发请求
          let res = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 再次获取品牌列表数据
            this.getPageList(this.list.length < 1 ? this.page - 1 : this.page);
          }
        })
        .catch(() => {
          // 点击取消的时候触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
