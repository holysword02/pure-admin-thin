export default {
  path: "/password",
  meta: {
    icon: "bookAccount",
    title: "密码修改"
  },
  children: [
    {
      path: "/password/index",
      name: "Password",
      component: () => import("@/views/login/password/index.vue"),
      meta: {
        title: "密码修改",
        roles: ["1", "2", "3"]
      }
    }
  ]
};
