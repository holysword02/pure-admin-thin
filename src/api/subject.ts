import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const subjectFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/subjects/subject/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

// 新增
export const subjectInsert = (data?: object) => {
  return http.request("post", "/subjects/subject/add", { data });
};

// 删除
export const subjectDelete = id => {
  return http.request("delete", "/subjects/subject/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const subjectUpdate = (data?: object) => {
  return http.request(
    "put",
    "/subjects/subject/update",
    { data },
    {
      withCredentials: true
    }
  );
};
