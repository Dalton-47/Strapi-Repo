/**
 * page-content controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::page-content.page-content' as any, ({ strapi }) => ({
  // Get homepage content
  async getHomepage(ctx) {
    const homepage = await strapi.documents('api::page-content.page-content').findMany({
      filters: {
        isHomepage: true,
        publishedAt: { $notNull: true }
      },
      populate: ['heroImage', 'featuredImage', 'sections'],
      limit: 1
    });

    return { data: homepage[0] || null };
  },

  // Get page by slug
  async getBySlug(ctx) {
    const { slug } = ctx.params;
    
    const page = await strapi.documents('api::page-content.page-content').findMany({
      filters: {
        slug: slug,
        publishedAt: { $notNull: true }
      },
      populate: ['heroImage', 'featuredImage', 'sections'],
      limit: 1
    });

    return { data: page[0] || null };
  },

  // Get pages by type
  async getByType(ctx) {
    const { type } = ctx.params;
    const { limit = 10 } = ctx.query;

    const pages = await strapi.documents('api::page-content.page-content').findMany({
      filters: {
        pageType: type,
        publishedAt: { $notNull: true }
      },
      populate: ['heroImage', 'featuredImage'],
      sort: ['publishedAt:desc'],
      limit: parseInt(limit as string)
    });

    return { data: pages };
  }
}));
