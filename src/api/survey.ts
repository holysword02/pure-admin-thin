import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 新增
export const surveyInsert = (data?: string) => {
  return http.request("post", "/surveys/survey/add", { data });
};

// 删除
export const surveyDelete = id => {
  return http.request("delete", "/surveys/survey/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const surveyUpdate = (data?: object) => {
  return http.request(
    "put",
    "/surveys/survey/update",
    { data },
    {
      withCredentials: true
    }
  );
};
