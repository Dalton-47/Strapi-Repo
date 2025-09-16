export default {
  routes: [
    {
      method: 'GET',
      path: '/navigation-menus/main',
      handler: 'navigation-menu.getMainMenu',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/navigation-menus/tree',
      handler: 'navigation-menu.getMenuTree',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
