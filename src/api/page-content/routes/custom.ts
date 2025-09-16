export default {
  routes: [
    {
      method: 'GET',
      path: '/page-contents/homepage',
      handler: 'page-content.getHomepage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-contents/slug/:slug',
      handler: 'page-content.getBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/page-contents/type/:type',
      handler: 'page-content.getByType',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
