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
