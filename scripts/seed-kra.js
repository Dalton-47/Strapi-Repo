'use strict';

const fs = require('fs-extra');
const path = require('path');
const { siteSettings, services, news } = require('../data/kra-sample-data.json');

async function seedKRAData() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up KRA template data...');
      await importKRAData();
      console.log('KRA data ready!');
    } catch (error) {
      console.log('Could not import KRA seed data');
      console.error(error);
    }
  } else {
    console.log('KRA seed data has already been imported.');
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'kraInitHasRun' });
  await pluginStore.set({ key: 'kraInitHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions() {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  const controllers = ['service', 'kra-news', 'site-setting'];
  
  controllers.forEach((controller) => {
    const actions = ['find', 'findOne'];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  
  await Promise.all(allPermissionsToCreate);
}

async function createEntry({ model, entry }) {
  try {
    await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function importServices() {
  for (const service of services) {
    await createEntry({
      model: 'service',
      entry: {
        ...service,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importNews() {
  for (const newsItem of news) {
    await createEntry({
      model: 'kra-news',
      entry: {
        ...newsItem,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importSiteSettings() {
  await createEntry({
    model: 'site-setting',
    entry: {
      ...siteSettings,
      publishedAt: Date.now(),
    },
  });
}

async function importKRAData() {
  // Allow read of application content types
  await setPublicPermissions();

  // Create all entries
  await importSiteSettings();
  await importServices();
  await importNews();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedKRAData();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
