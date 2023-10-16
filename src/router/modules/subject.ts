export default {
  path: "/subject",
  meta: {
    icon: "bookAccount",
    title: "学科信息管理"
  },
  children: [
    {
      path: "/subject/index",
      name: "Subject",
      component: () => import("@/views/subject/index.vue"),
      meta: {
        title: "学科信息管理",
        roles: ["0", "1"]
      }
    }
  ]
};
