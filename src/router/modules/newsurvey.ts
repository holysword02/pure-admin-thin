export default {
  path: "/newsurvey",
  meta: {
    icon: "bookAccount",
    showLink: false,
    title: "问卷系统"
  },
  children: [
    {
      path: "/newsurvey/index",
      component: () => import("@/views/question/tabs/newSurvey.vue"),
      name: "NewSurvey",
      meta: {
        // 不在menu菜单中显示
        // showLink: false,
        title: "新建问卷",
        activePath: "/tabs/index",
        roles: ["0"]
      }
    }
  ]
};
