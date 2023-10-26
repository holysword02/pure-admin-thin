export default {
  path: "/classes",
  meta: {
    icon: "bookAccount",
    title: "班级信息管理"
  },
  children: [
    {
      path: "/classes/index",
      name: "Classes",
      component: () => import("@/views/classes/index.vue"),
      meta: {
        title: "班级信息管理",
        roles: ["0"]
      }
    }
  ]
};
