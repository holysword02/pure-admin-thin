import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 新增问卷
export const surveyInsert = (data?: object) => {
  return http.request("post", "/surveys/survey/newone", { data });
};

// 删除问卷
export const surveyDelete = id => {
  return http.request("delete", "/surveys/survey/delete/" + id, {
    withCredentials: true
  });
};

//查询问卷
export const surveyFind = id => {
  return http.request("get", "/surveys/survey/find/" + id, {
    withCredentials: true
  });
};

// 修改问卷
export const surveyoneUpdate = (data?: object) => {
  return http.request(
    "put",
    "/surveys/survey/updateone",
    { data },
    {
      withCredentials: true
    }
  );
};

// 修改详细
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
