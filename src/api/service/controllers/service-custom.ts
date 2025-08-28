/**
 * Custom service controller for additional endpoints
 */

export default {
  // Get services by category
  async findByCategory(ctx) {
    const { category } = ctx.params;
    
    const services = await strapi.documents('api::service.service').findMany({
      filters: {
        category: category,
        isActive: true
      },
      sort: ['order:asc', 'title:asc'],
      populate: '*'
    });
    
    return { data: services };
  },

  // Get quick links
  async getQuickLinks(ctx) {
    const quickLinks = await strapi.documents('api::service.service').findMany({
      filters: {
        isQuickLink: true,
        isActive: true
      },
      sort: ['order:asc', 'title:asc'],
      populate: '*'
    });
    
    return { data: quickLinks };
  }
};
