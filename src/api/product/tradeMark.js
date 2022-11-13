// 该获取品牌管理的数据模块
import request from "@/utils/request";
// 获取平拍列表接口
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
};
// 处理添加品牌的操作
// 新增品牌: /admin/product/baseTrademark/save  post  两参 品牌名称、品牌logo
// 切记：对于新增的品牌,给服务器传递数据，不需要传递ID，ID是由服务器生成

// 修改品牌
// /admin/product/baseTrademark/update  put 三参：id、品牌名称、品牌logo
// 修改要带id，告诉服务器修改哪一个品牌
export const reqAddOrUpdateTradeMark =  (tradeMark) => {
  // 带给服务器数据带了id，则是修改
  if (tradeMark.id) {
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    // 新增品牌
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
}
// 删除品牌的接口
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark =  (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
}