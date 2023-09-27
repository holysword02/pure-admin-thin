export default {
  path: "/question",
  meta: {
    icon: "bookAccount",
    title: "调查问题信息管理"
  },
  children: [
    {
      path: "/question/index",
      name: "Question",
      component: () => import("@/views/question/index.vue"),
      meta: {
        title: "调查问题信息管理",
        roles: ["0"]
      }
    }
  ]
};
