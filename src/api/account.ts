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
export const accountInsert = (data?: object) => {
  return http.request("post", "/api/user/insert", { data });
};
// 删除
export const accountDelete = id => {
  return http.request("delete", "/api/user/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const accountUpdate = (data?: object) => {
  return http.request(
    "put",
    "/api/user/update",
    { data },
    {
      withCredentials: true
    }
  );
};
