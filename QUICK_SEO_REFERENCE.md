# SEO Quick Reference Card

## 🚀 Get Started in 5 Steps

### Step 1: Environment Setup
```bash
# Copy template
cp .env.example .env.local

# Fill in your information
NEXT_PUBLIC_SITE_URL=https://elshaddaifurnitures.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<your-code>
NEXT_PUBLIC_BUSINESS_PHONE=+91-XXXXXXXXXX
NEXT_PUBLIC_BUSINESS_EMAIL=contact@elshaddaifurnitures.com
```

### Step 2: Verify Assets
```
Required files in public/:
✅ favicon.ico
✅ apple-touch-icon.png
✅ og-image.jpg (1200x630px)
✅ logo.png
✅ site.webmanifest (already created)
```

### Step 3: Build & Deploy
```bash
npm run build
npm run start  # or deploy to hosting
```

### Step 4: Register with Search Engines
```
Google Search Console: https://search.google.com/search-console
└─ Add domain property
└─ Verify ownership
└─ Submit /sitemap.xml

Bing Webmaster Tools: https://www.bing.com/webmasters
└─ Add domain
└─ Verify ownership
└─ Submit sitemap
```

### Step 5: Monitor Performance
```
Google Search Console:
├─ Coverage report (indexation)
├─ Performance (rankings, CTR)
├─ Core Web Vitals
└─ Mobile usability

Google Analytics 4:
├─ Organic traffic
├─ User behavior
├─ Conversions
└─ Goal completions
```

---

## 📝 Content Optimization Tips

### Page Titles (50-60 characters)
```
❌ Too short: "Furniture"
✅ Good: "Premium Wooden Cots | Teak Furniture | Elshaddai"

Priority: Include keyword, brand, benefit
```

### Meta Descriptions (150-160 characters)
```
❌ Too long or boring: "This page contains information..."
✅ Good: "Shop handcrafted wooden cots, sofas & dining tables made from premium teak. Free shipping available. Contact us today."

Tips: Include CTA, benefit, keyword
```

### Heading Hierarchy
```
✅ Correct:
<h1>Main Page Topic</h1>
<h2>Sub-section 1</h2>
<h3>Sub-topic</h3>
<h2>Sub-section 2</h2>

❌ Wrong:
<h1>Title</h1>
<h3>Skipped H2!</h3>
<h1>Another H1</h1>
```

### Image Alt Text
```
❌ Avoid: "furniture.jpg" or "image123"
✅ Use: "Premium teak wooden cot with carved headboard"

Tips: Describe image, include relevant keywords
```

---

## 🔗 Internal Linking Strategy

### Link from:
```
Homepage → All main pages
├─ Products page
├─ About (brand story)
└─ Contact

Products Page → Detail pages
├─ All product cards
└─ Category filters

Product Detail → Related items
├─ Similar products
├─ Same category
└─ Featured items
```

### Anchor Text
```
❌ Avoid: "Click here", "Learn more"
✅ Use: "Browse wooden cots", "View all sofas"

Tips: Descriptive, keyword-rich, natural
```

---

## 🎯 Keyword Research Quick Tips

### Target Keywords for Furniture Site
```
Primary:
- Wooden furniture
- Handcrafted furniture
- Teak wood furniture

By Product:
- Wooden cots / Beds
- Wooden sofas
- Dining tables
- Teapoys / Side tables

Long-tail:
- Premium wooden furniture online
- Handcrafted teak cot designs
- Buy solid wood sofas
- Custom furniture maker
```

### Keyword Placement
```
Required Placement:
✅ Page title
✅ H1 heading
✅ First 100 words
✅ URL (if natural)
✅ Alt text (if relevant)

Optional Placement:
✅ H2/H3 headings
✅ Image captions
✅ Internal links
```

---

## 📊 Monitoring Metrics

### Track Weekly
```
Google Search Console:
├─ Total impressions
├─ Total clicks
├─ Average CTR
└─ Average position
```

### Track Monthly
```
Google Analytics:
├─ Organic sessions
├─ Bounce rate
├─ Pages per session
├─ Average session duration
├─ Goal completions
└─ Conversion rate
```

### Track Quarterly
```
Overall Health:
├─ Indexed pages
├─ Top ranking keywords
├─ Top traffic pages
├─ Backlink profile
└─ Competitor analysis
```

---

## 🛠️ Tools & Resources

### Free Tools
```
Testing:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev
- Schema Validator: https://validator.schema.org

Monitoring:
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Google Trends: https://trends.google.com
```

### Premium Tools (Optional)
```
- Semrush: keyword research, competitor analysis
- Ahrefs: backlink analysis, keyword research
- Moz: SEO audit, rank tracking
- Screaming Frog: technical SEO audit
```

---

## ⚠️ Red Flags to Avoid

### Content Issues
```
❌ Keyword stuffing
❌ Duplicate content
❌ Thin/low-quality content
❌ Auto-generated content
❌ Misleading titles/descriptions
```

### Technical Issues
```
❌ Broken links
❌ Poor mobile experience
❌ Slow loading (>3s)
❌ Crawl errors not fixed
❌ Blocked resources
```

### Link Issues
```
❌ Buying backlinks
❌ Link networks
❌ Irrelevant links
❌ All links from one source
❌ Over-optimized anchor text
```

---

## 📞 Getting Help

### For Technical Issues
```
Check files in this order:
1. next.config.mjs - Config errors
2. src/lib/seo.ts - Metadata generation
3. src/app/layout.tsx - Root setup
4. Browser Console - Client-side errors
```

### For SEO Questions
```
Reference these files:
1. SEO_IMPLEMENTATION.md - Complete guide
2. SEO_CHECKLIST.md - Task list
3. SEO_ARCHITECTURE.md - System overview
4. Google Search Central - Official docs
```

### For Debugging
```
1. Test in Google Rich Results Test
2. Check GSC for errors
3. Verify robots.txt: /robots.txt
4. Check sitemap: /sitemap.xml
5. Test schema: https://validator.schema.org
```

---

## 🎓 Learning Path

### Week 1: Basics
- [ ] Read SEO_IMPLEMENTATION.md
- [ ] Set up environment variables
- [ ] Deploy website
- [ ] Register with GSC

### Week 2-3: Monitoring
- [ ] Check GSC daily
- [ ] Fix any crawl errors
- [ ] Monitor indexation
- [ ] Track positions

### Week 4: Optimization
- [ ] Analyze top pages
- [ ] Review search queries
- [ ] Optimize titles/descriptions
- [ ] Add more content

### Month 2+: Growth
- [ ] Build internal links
- [ ] Create new content
- [ ] Build external links
- [ ] Track conversions

---

## 💡 Pro Tips

### Optimization Priority
```
1. Fix crawl errors (Critical)
2. Mobile friendliness (Critical)
3. Page speed (Important)
4. Title/description tags (Important)
5. Schema markup (Important)
6. Content quality (Important)
7. Internal links (Good-to-have)
8. External links (Long-term)
```

### Content Calendar
```
Monthly:
- 4-8 new products
- 1 blog post (future)
- Product updates
- Seasonal promotions

Quarterly:
- Major content updates
- New categories
- Metadata optimization
- Backlink building
```

### Quick Wins
```
Fastest Results (1-2 weeks):
✅ Improve page titles
✅ Fix meta descriptions
✅ Add schema markup
✅ Fix broken links

Medium Term (1-2 months):
✅ Improve page speed
✅ Build internal links
✅ Add new content
✅ Update old content

Long Term (3-6 months):
✅ Build authority
✅ Get backlinks
✅ Improve rankings
✅ Increase traffic
```

---

## 📱 Mobile SEO Checklist

- ✅ Responsive design
- ✅ Mobile-friendly navigation
- ✅ Touch-friendly buttons (44x44px minimum)
- ✅ Fast loading (< 3 seconds)
- ✅ No interstitials blocking content
- ✅ Readable text (16px minimum)
- ✅ Proper viewport meta tag
- ✅ Mobile indexing

---

## 🔐 Security & Compliance

- ✅ HTTPS enabled (recommended)
- ✅ robots.txt configured
- ✅ Privacy policy (add to footer)
- ✅ Terms of service (add to footer)
- ✅ Cookie consent (if needed)
- ✅ Google Analytics GDPR compliant
- ✅ No malware on site

---

## ❓ FAQ

**Q: How long until I see results?**
A: 2-4 weeks to start seeing impressions, 3-6 months for significant traffic.

**Q: How often should I update content?**
A: Monthly product updates, quarterly major content reviews.

**Q: Do I need to submit pages to Google?**
A: No, but use "Request Indexing" in GSC for new pages.

**Q: What's a good click-through rate?**
A: Average 2-5%, industry dependent. Better titles/descriptions improve CTR.

**Q: How many backlinks do I need?**
A: Quality > Quantity. 10 good links beat 100 bad links.

**Q: When should I change URLs?**
A: Avoid changing URLs. If necessary, use 301 redirects.

**Q: How important are keywords?**
A: Important but not everything. Focus on content quality first.

**Q: Can I hide keyword-rich text?**
A: No! Keep content visible to both users and search engines.

---

## 📊 Success Metrics

```
Month 1:
- Pages indexed: 50+
- Impressions: 100+
- Click-through rate: 0.5-1%

Month 3:
- Pages indexed: 90%+
- Impressions: 1,000+
- Clicks: 50+
- Average position: <50

Month 6:
- Pages indexed: 95%+
- Impressions: 10,000+
- Clicks: 500+
- Average position: <20
- Ranking for 10+ keywords
```

---

**Last Updated:** April 14, 2024
**Print this for quick reference!**
