import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const statisticFind = (statisticId?: string, surveyId?: number) => {
  return http.request<FindResult>(
    "get",
    "/statistics/statistic/findone?statisticId=" +
      statisticId +
      "&surveyId=" +
      surveyId
  );
};
