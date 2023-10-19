export default {
  path: "/ques",
  meta: {
    icon: "bookAccount",
    title: "学科信息管理"
  },
  children: [
    {
      path: "/ques/index",
      name: "Ques",
      component: () => import("@/views/ques/index.vue"),
      meta: {
        title: "Ques"
      }
    }
  ]
};
