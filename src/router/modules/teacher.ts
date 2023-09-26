export default {
  path: "/teacher",
  meta: {
    icon: "bookAccount",
    title: "教师信息管理"
  },
  children: [
    {
      path: "/teacher/index",
      name: "Teacher",
      component: () => import("@/views/teacher/index.vue"),
      meta: {
        title: "教师信息管理"
      }
    }
  ]
};
