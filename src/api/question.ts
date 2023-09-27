import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const questionFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/questions/question/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

// 新增
export const questionInsert = (data?: object) => {
  return http.request("post", "/questions/question/add", { data });
};

// 删除
export const questionDelete = id => {
  return http.request("delete", "/questions/question/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const questionUpdate = (data?: object) => {
  return http.request(
    "put",
    "/questions/question/update",
    { data },
    {
      withCredentials: true
    }
  );
};

export const questionList = () => {
  return http.request("get", "http://localhost:6065/dict/list/subject");
};
