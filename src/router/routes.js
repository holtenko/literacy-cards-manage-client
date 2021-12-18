import menus from "./menus";
const routes = menus.concat([
  {
    path: "/",
    component: () => import("../pages/CardsPage.vue"),
  }
]);

export default routes;
