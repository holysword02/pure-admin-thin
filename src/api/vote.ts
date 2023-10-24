import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const voteFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/votes/vote/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};

//插入投票
export const voteUpdate = (data?: object) => {
  return http.request(
    "put",
    "/votes/vote/vote",
    { data },
    {
      withCredentials: true
    }
  );
};
