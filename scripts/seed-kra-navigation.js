const fs = require('fs-extra');
const path = require('path');

async function seedKRANavigation() {
  try {
    console.log('🌱 Starting KRA Navigation data seeding...');

    // Read the sample data
    const dataPath = path.join(__dirname, '../data/kra-navigation-data.json');
    const sampleData = await fs.readJson(dataPath);

    // Import Strapi
    const strapi = require('@strapi/strapi');
    const app = await strapi().load();

    // Seed Navigation Menus
    console.log('📋 Seeding navigation menus...');
    for (const menuData of sampleData.navigationMenus) {
      try {
        // Create main menu item
        const mainMenu = await strapi.documents('api::navigation-menu.navigation-menu').create({
          data: {
            title: menuData.title,
            slug: menuData.slug,
            url: menuData.url,
            isMainMenu: menuData.isMainMenu,
            isActive: menuData.isActive,
            order: menuData.order,
            description: menuData.description,
            publishedAt: new Date()
          }
        });

        console.log(`✅ Created main menu: ${menuData.title}`);

        // Create children if they exist
        if (menuData.children && menuData.children.length > 0) {
          for (const childData of menuData.children) {
            const childMenu = await strapi.documents('api::navigation-menu.navigation-menu').create({
              data: {
                title: childData.title,
                slug: childData.slug,
                url: childData.url,
                isActive: childData.isActive,
                order: childData.order,
                description: childData.description,
                parent: mainMenu.documentId,
                publishedAt: new Date()
              }
            });

            console.log(`  ✅ Created child menu: ${childData.title}`);

            // Create grandchildren if they exist
            if (childData.children && childData.children.length > 0) {
              for (const grandchildData of childData.children) {
                await strapi.documents('api::navigation-menu.navigation-menu').create({
                  data: {
                    title: grandchildData.title,
                    slug: grandchildData.slug,
                    url: grandchildData.url,
                    isActive: grandchildData.isActive,
                    order: grandchildData.order,
                    parent: childMenu.documentId,
                    publishedAt: new Date()
                  }
                });

                console.log(`    ✅ Created grandchild menu: ${grandchildData.title}`);
              }
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error creating menu ${menuData.title}:`, error.message);
      }
    }

    // Seed Page Contents
    console.log('📄 Seeding page contents...');
    for (const pageData of sampleData.pageContents) {
      try {
        await strapi.documents('api::page-content.page-content').create({
          data: {
            title: pageData.title,
            slug: pageData.slug,
            pageType: pageData.pageType,
            isHomepage: pageData.isHomepage,
            metaDescription: pageData.metaDescription,
            content: pageData.content,
            sections: pageData.sections,
            publishedAt: new Date()
          }
        });

        console.log(`✅ Created page: ${pageData.title}`);
      } catch (error) {
        console.error(`❌ Error creating page ${pageData.title}:`, error.message);
      }
    }

    // Seed Contact Information
    console.log('📞 Seeding contact information...');
    for (const contactData of sampleData.contactInfos) {
      try {
        await strapi.documents('api::contact-info.contact-info').create({
          data: {
            name: contactData.name,
            type: contactData.type,
            address: contactData.address,
            phone: contactData.phone,
            email: contactData.email,
            workingHours: contactData.workingHours,
            isPrimary: contactData.isPrimary,
            coordinates: contactData.coordinates,
            publishedAt: new Date()
          }
        });

        console.log(`✅ Created contact info: ${contactData.name}`);
      } catch (error) {
        console.error(`❌ Error creating contact ${contactData.name}:`, error.message);
      }
    }

    // Set permissions for public access
    console.log('🔐 Setting permissions...');
    
    const permissions = [
      'api::navigation-menu.navigation-menu',
      'api::page-content.page-content',
      'api::contact-info.contact-info'
    ];

    for (const permission of permissions) {
      try {
        await strapi.documents('plugin::users-permissions.permission').create({
          data: {
            action: 'find',
            subject: permission,
            role: 'public',
            properties: {},
            conditions: [],
            publishedAt: new Date()
          }
        });

        await strapi.documents('plugin::users-permissions.permission').create({
          data: {
            action: 'findOne',
            subject: permission,
            role: 'public',
            properties: {},
            conditions: [],
            publishedAt: new Date()
          }
        });

        console.log(`✅ Set permissions for ${permission}`);
      } catch (error) {
        console.log(`⚠️  Permission for ${permission} might already exist`);
      }
    }

    console.log('🎉 KRA Navigation data seeding completed successfully!');
    console.log('\n📋 Available APIs:');
    console.log('• GET /api/navigation-menus/main - Main navigation menu');
    console.log('• GET /api/navigation-menus/tree - Full menu tree');
    console.log('• GET /api/page-contents/homepage - Homepage content');
    console.log('• GET /api/page-contents/slug/:slug - Page by slug');
    console.log('• GET /api/contact-infos/headquarters - KRA headquarters');
    console.log('• GET /api/contact-infos/contact-center - Contact center');
    console.log('• GET /api/contact-infos/all - All contact information');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeding
seedKRANavigation();
