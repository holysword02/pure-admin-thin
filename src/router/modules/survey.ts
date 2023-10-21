
export default {
  path: "/formDesign",
  meta: {
    icon: "bookAccount",
    title: "学科信息管理"
  },
  children: [
    {
      path: "/formDesign/index",
      name: "FormDesign",
      component: () => import("@/views/ques/survey/index.vue"),
      meta: {
        title: "FormDesign"
      }
    }
  ]
};
