import { http } from "@/utils/http";
import { FindResult } from "@/api/types";

// 分页查询
export const classesFind = (pageNum?: number, pageSize?: number) => {
    return http.request<FindResult>(
        "get",
        "/classes/class/find?pageNum=" + pageNum + "&pageSize=" + pageSize
    );
};

// 新增
export const classesInsert = (data?: object) => {
    return http.request("post", "/classes/class/addTeacherAndUser", { data });
};

// 删除
export const classesDelete = id => {
    return http.request("delete", "/classes/class/delete/" + id, {
        withCredentials: true
    });
};

// 修改
export const classesUpdate = (data?: object) => {
    return http.request(
        "put",
        "/classes/class/update",
        { data },
        {
            withCredentials: true
        }
    );
};
