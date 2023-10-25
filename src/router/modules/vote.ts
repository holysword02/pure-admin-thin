export default {
  path: "/vote",
  meta: {
    icon: "bookAccount",
    title: "投票",
    roles: ["2"]
  },
  children: [
    {
      path: "/vote/index",
      name: "Vote",
      component: () => import("@/views/vote/index.vue"),
      meta: {
        title: "投票",
        roles: ["2"]
      }
    },
    {
      path: "/vote/vote/index",
      name: "newVote",
      component: () => import("@/views/vote/vote/index.vue"),
      meta: {
        // 不在menu菜单中显示
        showLink: false,
        activePath: "/vote/index",
        roles: ["2"]
      }
    }
  ]
};
