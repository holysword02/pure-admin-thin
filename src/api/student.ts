import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const studentFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/students/student/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

// 新增
export const studentInsert = (data?: object) => {
  return http.request("post", "/students/student/add", { data });
};

// 删除
export const studentDelete = id => {
  return http.request("delete", "/students/student/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const studentUpdate = (data?: object) => {
  return http.request(
    "put",
    "/students/student/update",
    { data },
    {
      withCredentials: true
    }
  );
};
