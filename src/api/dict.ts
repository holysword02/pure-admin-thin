import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const dictFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/dicts/dict/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

//查询全部
export const dictFindAll = () => {
  return http.request("get", "/dicts/dict/findAll");
};

// 新增
export const dictInsert = (data?: object) => {
  return http.request("post", "/dicts/dict/add", { data });
};

// 删除
export const dictDelete = id => {
  return http.request("delete", "/dicts/dict/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const dictUpdate = (data?: object) => {
  return http.request(
    "put",
    "/dicts/dict/update",
    { data },
    {
      withCredentials: true
    }
  );
};
