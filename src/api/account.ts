import { http } from "@/utils/http";

export type FindResult = {
  records: Array<any>;
  total: number;
  size: number;
  current: number;
};

export const accountFind = (pageNum?: number, pageSize?: number) => {
  return http.request<FindResult>(
    "get",
    "/api/user/find?pageNum=" + pageNum + "&pageSize=" + pageSize
  );
};
