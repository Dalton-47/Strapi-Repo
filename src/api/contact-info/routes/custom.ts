export default {
  routes: [
    {
      method: 'GET',
      path: '/contact-infos/headquarters',
      handler: 'contact-info.getHeadquarters',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-infos/contact-center',
      handler: 'contact-info.getContactCenter',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-infos/type/:type',
      handler: 'contact-info.getByType',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-infos/all',
      handler: 'contact-info.getAllContacts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
