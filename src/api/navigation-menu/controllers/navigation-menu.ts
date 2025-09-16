/**
 * navigation-menu controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::navigation-menu.navigation-menu' as any, ({ strapi }) => ({
  // Get main navigation menu
  async getMainMenu(ctx) {
    const mainMenu = await strapi.documents('api::navigation-menu.navigation-menu').findMany({
      filters: {
        isMainMenu: true,
        isActive: true,
        parent: null
      },
      sort: ['order:asc', 'title:asc'],
      populate: {
        children: {
          filters: {
            isActive: true
          },
          sort: ['order:asc', 'title:asc'],
          populate: {
            children: {
              filters: {
                isActive: true
              },
              sort: ['order:asc', 'title:asc']
            }
          }
        }
      }
    });

    return { data: mainMenu };
  },

  // Get menu tree structure
  async getMenuTree(ctx) {
    const menuTree = await strapi.documents('api::navigation-menu.navigation-menu').findMany({
      filters: {
        isActive: true,
        parent: null
      },
      sort: ['order:asc', 'title:asc'],
      populate: {
        children: {
          filters: {
            isActive: true
          },
          sort: ['order:asc', 'title:asc'],
          populate: {
            children: {
              filters: {
                isActive: true
              },
              sort: ['order:asc', 'title:asc']
            }
          }
        }
      }
    });

    return { data: menuTree };
  }
}));
