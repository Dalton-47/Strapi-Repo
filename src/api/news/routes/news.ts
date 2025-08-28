/**
 * news router.
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/news',
      handler: 'news.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/:id',
      handler: 'news.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/featured',
      handler: 'news.getFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/latest',
      handler: 'news.getLatest',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/news/category/:category',
      handler: 'news.getByCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
