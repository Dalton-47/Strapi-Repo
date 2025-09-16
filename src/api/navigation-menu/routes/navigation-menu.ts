import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::navigation-menu.navigation-menu', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
