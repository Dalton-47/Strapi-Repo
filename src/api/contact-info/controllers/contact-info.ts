/**
 * contact-info controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-info.contact-info' as any, ({ strapi }) => ({
  // Get headquarters information
  async getHeadquarters(ctx) {
    const headquarters = await strapi.documents('api::contact-info.contact-info').findMany({
      filters: {
        type: 'headquarters',
        publishedAt: { $notNull: true }
      },
      sort: ['isPrimary:desc', 'name:asc'],
      limit: 1
    });

    return { data: headquarters[0] || null };
  },

  // Get contact center information
  async getContactCenter(ctx) {
    const contactCenter = await strapi.documents('api::contact-info.contact-info').findMany({
      filters: {
        type: 'contact-center',
        publishedAt: { $notNull: true }
      },
      sort: ['isPrimary:desc', 'name:asc'],
      limit: 1
    });

    return { data: contactCenter[0] || null };
  },

  // Get all contact information by type
  async getByType(ctx) {
    const { type } = ctx.params;

    const contacts = await strapi.documents('api::contact-info.contact-info').findMany({
      filters: {
        type: type,
        publishedAt: { $notNull: true }
      },
      sort: ['isPrimary:desc', 'name:asc']
    });

    return { data: contacts };
  },

  // Get all contact information
  async getAllContacts(ctx) {
    const contacts = await strapi.documents('api::contact-info.contact-info').findMany({
      filters: {
        publishedAt: { $notNull: true }
      },
      sort: ['type:asc', 'isPrimary:desc', 'name:asc']
    });

    return { data: contacts };
  }
}));
