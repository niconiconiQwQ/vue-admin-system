// 平台属性管理模块请求文件
import request from "@/utils/request";
// 获取一级分类数据接口
// /admin/product/get/category1/{id} get
export const reqCategory1List = () => {
  return request({
    url: `/admin/product/getCategory1`,
    method: "get",
  });
};
// 获取二级分类数据接口
// /admin/product/get/category2/{id} get
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
};

// 获取三级分类数据接口
// /admin/product/get/category3/{id} get
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
};
// 获取平台属性接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = ({ category1Id, category2Id, category3Id }) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};
