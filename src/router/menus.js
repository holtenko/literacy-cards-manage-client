const menus = [
  {
    title: "卡片管理",
    icon: "dashboard",
    path: "/cards",
    component: () => import("../pages/CardsPage.vue"),
  },
  {
    title: "发布管理",
    icon: "school",
    path: "/publish",
    component: () => import("../pages/PublishPage.vue"),
  },
];

export default menus;
