import { $t } from "@/plugins/i18n";
import { formdesign } from "@/router/enums";
const IFrame = () => import("@/layout/frameView.vue");
export default {
  path: "/formDesign",
  redirect: "/formDesign/index",
  meta: {
    icon: "terminalWindowLine",
    title: $t("menus.hsFormDesign"),
    rank: formdesign
  },
  children: [
    {
      path: "/formDesign/index",
      name: "FormDesign",
      component: () => import("@/views/survey/components/Home.vue"),
      meta: {
        title: $t("menus.hsFormDesign")
      }
    }
  ]
} as RouteConfigsTable;
