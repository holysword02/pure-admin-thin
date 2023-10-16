import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const teacherFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/teachers/teacher/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

// 新增
export const teacherInsert = (data?: object) => {
  return http.request("post", "/teachers/teacher/addTeacherAndUser", { data });
};

// 删除
export const teacherDelete = id => {
  return http.request("delete", "/teachers/teacher/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const teacherUpdate = (data?: object) => {
  return http.request(
    "put",
    "/teachers/teacher/update",
    { data },
    {
      withCredentials: true
    }
  );
};
