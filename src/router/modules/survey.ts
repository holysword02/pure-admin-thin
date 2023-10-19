
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
      component: () => import("@/views/survey/components/Home.vue"),
      meta: {
        title: "FormDesign"
      }
    }
  ]
};
