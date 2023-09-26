import { http } from "@/utils/http";

export type FindResult = {
  records: Array<any>;
  total: number;
  size: number;
  current: number;
};
// 分页查询
export const accountFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/api/user/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};
// 新增
export const accountInsert = () => {
  return http.request("post", "/api/user/insert");
};
// 删除
export const accountDelete = id => {
  http.request("delete", "/api/user/delete/" + id, null, {
    withCredentials: true
  });
};

// 修改
export const accountUpdate = (data?: object) => {
  return http.request("put", "/api/user/update", data, {
    withCredentials: true
  });
};
