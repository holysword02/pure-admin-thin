import { http } from "@/utils/http";

type Ques = {
  id: string;
  value: Array<any>;
};
//查询全部
export const quesOne = (id?: string) => {
  return http.request<Ques>("get", "/quess/survey/findone/" + id, {
    withCredentials: true
  });
};

// 新增
export const quesInsert = (data?: object) => {
  return http.request("post", "/quess/ques/addquesAndUser", { data });
};

// 删除
export const quesDelete = id => {
  return http.request("delete", "/quess/ques/delete/" + id, {
    withCredentials: true
  });
};

// 修改
export const quesUpdate = (data?: object) => {
  return http.request(
    "put",
    "/quess/ques/update",
    { data },
    {
      withCredentials: true
    }
  );
};
