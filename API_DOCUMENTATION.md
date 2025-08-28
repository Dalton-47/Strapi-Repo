# KRA Frontend API Documentation

This document outlines the APIs available for the Kenya Revenue Authority frontend application.

## Base URL
```
http://localhost:1337/api
```

## Authentication
All APIs are currently configured for public access. No authentication required for GET requests.

## Content Types

### 1. Services API

#### Get All Services
```http
GET /api/services
```

**Query Parameters:**
- `filters[category]` - Filter by category (individual, business, investor, agent, general)
- `filters[isQuickLink]` - Filter by quick link status (true/false)
- `sort` - Sort by field (default: order:asc,title:asc)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "PIN Registration",
      "description": "Register for a Personal Identification Number (PIN) for tax purposes",
      "category": "individual",
      "isQuickLink": true,
      "icon": "person",
      "order": 1,
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Get Services by Category
```http
GET /api/services/category/{category}
```

**Parameters:**
- `category` - Category name (individual, business, investor, agent, general)

#### Get Quick Links
```http
GET /api/services/quick-links
```

#### Get Single Service
```http
GET /api/services/{id}
```

### 2. News API

#### Get All News
```http
GET /api/kra-news
```

**Query Parameters:**
- `filters[category]` - Filter by category (announcement, press-release, update, general)
- `filters[isFeatured]` - Filter by featured status (true/false)
- `sort` - Sort by field (default: publishedDate:desc)
- `pagination[limit]` - Limit number of results

#### Get Featured News
```http
GET /api/kra-news/featured
```

#### Get Latest News
```http
GET /api/kra-news/latest?limit=10
```

#### Get News by Category
```http
GET /api/kra-news/category/{category}
```

#### Get Single News Item
```http
GET /api/kra-news/{id}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "KRA Launches New iTax Portal Features",
    "excerpt": "Enhanced user experience with new features for easier tax filing and payment",
    "content": "The Kenya Revenue Authority has launched new features...",
    "category": "announcement",
    "isFeatured": true,
    "publishedDate": "2024-01-15T10:00:00.000Z",
    "tags": ["itax", "portal", "features"],
    "featuredImage": {
      "url": "/uploads/image.jpg",
      "alternativeText": "KRA iTax Portal"
    }
  }
}
```

### 3. Site Settings API

#### Get Site Settings
```http
GET /api/site-setting
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "siteName": "Kenya Revenue Authority",
    "siteDescription": "Enhancing revenue collection and facilitating voluntary tax compliance...",
    "heroTitle": "Kenya Revenue Authority",
    "heroSubtitle": "Enhancing revenue collection and facilitating voluntary tax compliance...",
    "primaryCtaText": "Access iTax Portal",
    "primaryCtaUrl": "https://itax.kra.go.ke",
    "secondaryCtaText": "Learn More",
    "secondaryCtaUrl": "/about",
    "contactInfo": {
      "phone": "+254 20 310900",
      "email": "info@kra.go.ke",
      "address": "Times Tower Building, Haile Selassie Avenue...",
      "workingHours": "Monday - Friday: 8:00 AM - 5:00 PM"
    },
    "socialLinks": [
      {
        "platform": "facebook",
        "url": "https://facebook.com/KenyaRevenueAuthority",
        "label": "Facebook"
      }
    ],
    "logo": {
      "url": "/uploads/kra-logo.png",
      "alternativeText": "KRA Logo"
    }
  }
}
```

## Frontend Integration Examples

### React/JavaScript Examples

#### Fetch Site Settings
```javascript
const fetchSiteSettings = async () => {
  const response = await fetch('http://localhost:1337/api/site-setting');
  const data = await response.json();
  return data.data;
};
```

#### Fetch Services by Category
```javascript
const fetchServicesByCategory = async (category) => {
  const response = await fetch(`http://localhost:1337/api/services/category/${category}`);
  const data = await response.json();
  return data.data;
};
```

#### Fetch Quick Links
```javascript
const fetchQuickLinks = async () => {
  const response = await fetch('http://localhost:1337/api/services/quick-links');
  const data = await response.json();
  return data.data;
};
```

#### Fetch Featured News
```javascript
const fetchFeaturedNews = async () => {
  const response = await fetch('http://localhost:1337/api/kra-news/featured');
  const data = await response.json();
  return data.data;
};
```

## Setup Instructions

1. **Start Strapi Development Server:**
   ```bash
   npm run dev
   ```

2. **Seed KRA Data:**
   ```bash
   npm run seed:kra
   ```

3. **Access Strapi Admin:**
   - URL: `http://localhost:1337/admin`
   - Create admin account on first visit

4. **Test APIs:**
   - Use the URLs above to test API endpoints
   - Use tools like Postman or curl for testing

## CORS Configuration

If you encounter CORS issues with your frontend, update `config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Error Handling

All APIs return standard HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found"
  }
}
```
