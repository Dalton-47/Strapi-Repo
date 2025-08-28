/**
 * site-setting router.
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/site-setting',
      handler: 'site-setting.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
