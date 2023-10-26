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
        roles: ["0", "1", "2"]
      }
    },
    {
      path: "/question/tabs/index",
      name: "Tabs",
      component: () => import("@/views/question/tabs/index.vue"),
      meta: {
        showLink: false,
        title: "调查问题信息管理",
        roles: ["0"]
      }
    },
    // params 传参模式
    {
      path: "/question/tabs/params-detail/:id",
      component: () => import("@/views/question/tabs/params-detail.vue"),
      name: "TabParamsDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/tabs/index",
        roles: ["0"]
      }
    },
    {
      path: "/question/statistic/index",
      name: "Statistic",
      component: () => import("@/views/question/statistic/index.vue"),
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/statistic/index",
        roles: ["0"]
      }
    }
  ]
};
