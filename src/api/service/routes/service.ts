/**
 * service router.
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/services',
      handler: 'service.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/services/:id',
      handler: 'service.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/services/category/:category',
      handler: 'service-custom.findByCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/services/quick-links',
      handler: 'service-custom.getQuickLinks',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
