# KRA Website API Documentation

This document provides comprehensive API documentation for the Kenya Revenue Authority (KRA) website backend powered by Strapi.

## Base URL
```
http://localhost:1337/api
```

## Authentication
All APIs are currently configured for public access (no authentication required).

## API Endpoints

### 1. Navigation Menu APIs

#### Get Main Navigation Menu
```http
GET /api/navigation-menus/main
```
Returns the main navigation menu structure with hierarchical children.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Individual",
      "slug": "individual",
      "url": "/individual",
      "isMainMenu": true,
      "isActive": true,
      "order": 1,
      "description": "Services for individual taxpayers",
      "children": [
        {
          "id": 2,
          "title": "PIN Registration",
          "slug": "pin-registration",
          "url": "/individual/pin-registration",
          "children": [...]
        }
      ]
    }
  ]
}
```

#### Get Full Menu Tree
```http
GET /api/navigation-menus/tree
```
Returns the complete hierarchical menu structure.

#### Get All Navigation Menus
```http
GET /api/navigation-menus
```
Returns all navigation menu items with pagination.

### 2. Page Content APIs

#### Get Homepage Content
```http
GET /api/page-contents/homepage
```
Returns the homepage content including hero sections and dynamic content.

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "Home",
    "slug": "home",
    "pageType": "home",
    "isHomepage": true,
    "metaDescription": "Kenya Revenue Authority - Helping you find tax information & services",
    "content": "<p>Welcome to the Kenya Revenue Authority...</p>",
    "sections": [
      {
        "__component": "shared.hero-section",
        "title": "Helping you find tax information & services",
        "subtitle": "I would like to",
        "ctaText": "GET STARTED",
        "ctaUrl": "/services"
      }
    ]
  }
}
```

#### Get Page by Slug
```http
GET /api/page-contents/slug/:slug
```
Returns a specific page by its slug.

#### Get Pages by Type
```http
GET /api/page-contents/type/:type
```
Returns pages filtered by type (home, about, services, news, contact, general).

### 3. Contact Information APIs

#### Get KRA Headquarters
```http
GET /api/contact-infos/headquarters
```
Returns KRA headquarters contact information.

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "KRA Headquarters",
    "type": "headquarters",
    "address": "Times Tower Building, Haile Selassie Avenue, P. O. Box 48240 - 00100, Nairobi Kenya",
    "phone": "+254 20 4 999 999",
    "email": "callcentre@kra.go.ke",
    "workingHours": "Monday - Friday: 8:00 AM - 5:00 PM",
    "isPrimary": true,
    "coordinates": {
      "lat": -1.2921,
      "lng": 36.8219
    }
  }
}
```

#### Get Contact Center
```http
GET /api/contact-infos/contact-center
```
Returns KRA contact center information.

#### Get All Contact Information
```http
GET /api/contact-infos/all
```
Returns all contact information organized by type.

### 4. Services APIs (Existing)

#### Get All Services
```http
GET /api/services
```
Returns all KRA services with filtering and pagination.

#### Get Services by Category
```http
GET /api/services/category/:category
```
Returns services filtered by category (individual, business, investor, agent, general).

#### Get Quick Links
```http
GET /api/services/quick-links
```
Returns services marked as quick links.

### 5. News APIs (Existing)

#### Get Featured News
```http
GET /api/kra-news/featured
```
Returns featured news articles.

#### Get Latest News
```http
GET /api/kra-news/latest?limit=10
```
Returns latest news articles with optional limit.

#### Get News by Category
```http
GET /api/kra-news/category/:category
```
Returns news filtered by category (announcement, press-release, update, general).

### 6. Media/Upload APIs

#### Get All Uploaded Files
```http
GET /api/upload/files
```
Returns all uploaded media files.

#### Get Specific File
```http
GET /api/upload/files/:id
```
Returns details of a specific uploaded file.

#### Direct File Access
```http
GET /uploads/:filename
```
Direct access to uploaded files (images, documents, etc.).

## Content Types

### Navigation Menu
- **title**: Menu item title
- **slug**: URL-friendly identifier
- **url**: Target URL
- **parent**: Parent menu item (for hierarchy)
- **order**: Display order
- **isActive**: Whether the menu item is active
- **isMainMenu**: Whether it's a main navigation item
- **description**: Menu item description

### Page Content
- **title**: Page title
- **slug**: URL-friendly identifier
- **content**: Rich text content
- **pageType**: Type of page (home, about, services, etc.)
- **isHomepage**: Whether it's the homepage
- **sections**: Dynamic zone with various section components
- **metaDescription**: SEO meta description

### Contact Info
- **name**: Contact point name
- **type**: Type of contact (headquarters, contact-center, etc.)
- **address**: Physical address
- **phone**: Phone number
- **email**: Email address
- **workingHours**: Operating hours
- **coordinates**: GPS coordinates
- **isPrimary**: Whether it's the primary contact

## Dynamic Zone Components

### Hero Section
- **title**: Main headline
- **subtitle**: Subheading
- **backgroundImage**: Hero background image
- **ctaText**: Call-to-action button text
- **ctaUrl**: Call-to-action button URL

### Content Section
- **title**: Section title
- **content**: Rich text content
- **image**: Section image
- **imagePosition**: Image position (left, right, top, bottom)

### CTA Section
- **title**: Section title
- **description**: Section description
- **primaryCtaText**: Primary button text
- **primaryCtaUrl**: Primary button URL
- **secondaryCtaText**: Secondary button text
- **secondaryCtaUrl**: Secondary button URL

## Usage Examples

### Frontend Integration

#### React/Next.js Example
```javascript
// Fetch main navigation
const response = await fetch('http://localhost:1337/api/navigation-menus/main');
const navigation = await response.json();

// Fetch homepage content
const homepageResponse = await fetch('http://localhost:1337/api/page-contents/homepage');
const homepage = await homepageResponse.json();

// Fetch contact information
const contactResponse = await fetch('http://localhost:1337/api/contact-infos/headquarters');
const contact = await contactResponse.json();
```

#### Vue.js Example
```javascript
// Fetch services by category
const services = await this.$http.get('/api/services/category/individual');

// Fetch latest news
const news = await this.$http.get('/api/kra-news/latest?limit=5');
```

## Setup Instructions

1. **Start Strapi Development Server:**
   ```bash
   npm run dev
   ```

2. **Seed Sample Data:**
   ```bash
   npm run seed:kra-nav
   ```

3. **Access Strapi Admin:**
   ```
   http://localhost:1337/admin
   ```

4. **Test APIs:**
   ```bash
   curl http://localhost:1337/api/navigation-menus/main
   ```

## Notes

- All APIs return data in Strapi's standard format with `data` wrapper
- Pagination is available for collection endpoints
- Filtering and sorting can be applied using query parameters
- Media files are served directly from the `/uploads/` directory
- CORS is configured for local development
