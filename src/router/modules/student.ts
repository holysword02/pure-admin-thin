export default {
  path: "/student",
  meta: {
    icon: "bookAccount",
    title: "学生信息管理"
  },
  children: [
    {
      path: "/student/index",
      name: "Student",
      component: () => import("@/views/student/index.vue"),
      meta: {
        title: "学生信息管理",
        roles: ["0"]
      }
    }
  ]
};
