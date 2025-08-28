/**
 * news controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::news.news' as any, ({ strapi }) => ({
  // Get featured news
  async getFeatured(ctx) {
    const featuredNews = await strapi.documents('api::news.news').findMany({
      filters: {
        isFeatured: true,
        publishedAt: { $notNull: true }
      },
      sort: ['publishedDate:desc'],
      populate: ['featuredImage'],
      limit: 3
    });
    
    return { data: featuredNews };
  },

  // Get latest news
  async getLatest(ctx) {
    const { limit = 10 } = ctx.query;
    
    const latestNews = await strapi.documents('api::news.news').findMany({
      filters: {
        publishedAt: { $notNull: true }
      },
      sort: ['publishedDate:desc'],
      populate: ['featuredImage'],
      limit: parseInt(limit as string)
    });
    
    return { data: latestNews };
  },

  // Get news by category
  async getByCategory(ctx) {
    const { category } = ctx.params;
    const { limit = 10 } = ctx.query;
    
    const news = await strapi.documents('api::news.news').findMany({
      filters: {
        category: category,
        publishedAt: { $notNull: true }
      },
      sort: ['publishedDate:desc'],
      populate: ['featuredImage'],
      limit: parseInt(limit as string)
    });
    
    return { data: news };
  }
}));
