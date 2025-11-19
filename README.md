# TheDailyEditnews

A comprehensive editorial-style blog website featuring magazine-inspired design with a focus on typography, high-quality photography, and content-driven layouts.

## Features

- **Magazine/Editorial Design**: Clean, sophisticated layout with emphasis on typography and visual hierarchy
- **6 Content Categories**:
  - Fashion & Accessories
  - Health & Beauty
  - Home & Garden
  - Travel & Accommodation
  - Finance & Insurance
  - Food & Beverage
- **5 Featured Articles** with dates from January to August 2025
- **Product Recommendations**: Each article includes curated product recommendations with descriptions
- **Search Functionality**: Full-text search across all articles
- **Category Filtering**: Browse articles by category
- **Pagination**: Easy navigation through article listings
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: CSS transitions and animations throughout
- **Social Media Integration**: Social icons in footer and contact page

## File Structure

```
TheDailyEditnews/
├── index.html          # Homepage
├── article.html        # Individual article page
├── category.html       # Category listing page
├── about.html          # About page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── articles.json       # Article data
└── README.md          # This file
```

## Design Philosophy

TheDailyEditnews follows a **magazine/editorial design approach** with:

- **Cold Color Palette**: Deep blues and grays (#1a1a2e, #16213e, #0f3460)
- **Typography-First**: Playfair Display for headings, Inter for body text
- **High-Quality Imagery**: Large, impactful images from Unsplash
- **Content-Driven Layout**: Emphasis on readability and visual hierarchy
- **Editorial Feel**: Newspaper/magazine-inspired sections and spacing

## Usage

1. Open `index.html` in a web browser
2. Navigate through categories using the dropdown menu
3. Click on articles to read full content
4. Use the search icon to search across all content
5. Browse product recommendations within articles

## Articles Included

1. **Sustainable Fashion: The Future of Wardrobe Essentials** (January 15, 2025)
   - Category: Fashion & Accessories
   - Products: Organic Cotton T-Shirt, Recycled Denim Jacket

2. **The Science of Skincare: Advanced Anti-Aging Solutions** (March 22, 2025)
   - Category: Health & Beauty
   - Products: Advanced Retinol Serum, Vitamin C E Ferulic Serum

3. **Minimalist Home Design: Creating Serene Living Spaces** (May 10, 2025)
   - Category: Home & Garden
   - Products: Scandinavian Sofa, Bamboo Storage System

4. **Hidden Gems: Undiscovered European Destinations** (July 18, 2025)
   - Category: Travel & Accommodation
   - Products: European Travel Guide, Travel Packing Essentials

5. **Smart Financial Planning for Millennials and Gen Z** (August 5, 2025)
   - Category: Finance & Insurance
   - Products: Personal Finance App, Investment Platform

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All images are sourced from Unsplash (placeholder URLs)
- This is a static website - no server required
- Contact form currently shows an alert (can be connected to a backend)
- All article content is stored in `articles.json`

## Customization

To add new articles:
1. Edit `articles.json` and add a new article object
2. Follow the existing structure with required fields: id, title, category, date, author, featuredImage, excerpt, content, images, products

To modify colors:
- Edit CSS variables in `:root` section of `styles.css`

## License

This project is created for TheDailyEditnews website.




