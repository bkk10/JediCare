# JediCare Medical Centre - Deployment Guide

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended - Easiest)
**Time**: 5 minutes | **Cost**: Free

#### Steps:
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)** and sign up

3. **Drag & drop the `build` folder** to Netlify

4. **Your site is live!** 🎉

#### Custom Domain (Optional):
- Go to Site settings → Domain management
- Add your custom domain (e.g., jedicare.co.ke)
- Update DNS records as instructed

---

### 2. Vercel (Alternative)
**Time**: 5 minutes | **Cost**: Free

#### Steps:
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up

3. **Import your GitHub repository** or drag & drop

4. **Deploy automatically**

---

### 3. GitHub Pages (Free with GitHub)
**Time**: 10 minutes | **Cost**: Free

#### Steps:
1. **Create `gh-pages` branch**:
   ```bash
   git checkout -b gh-pages
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Save

3. **Your site is live at**: `https://username.github.io/jedicare`

---

### 4. Firebase Hosting (Google)
**Time**: 10 minutes | **Cost**: Free tier available

#### Steps:
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   firebase init
   ```

2. **Deploy**:
   ```bash
   firebase deploy
   ```

---

### 5. Traditional Web Hosting
**Time**: 15 minutes | **Cost**: $5-20/month

#### Steps:
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `build` folder** to your hosting provider
3. **Point your domain** to the hosting

---

## 📋 Pre-Deployment Checklist

### Before Deploying:
- [ ] Test all forms and functionality
- [ ] Check email service works
- [ ] Test admin panel
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Update contact information

### Build Commands:
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test locally (optional)
npm start
```

---

## 🔧 Configuration Files

### Add to `package.json`:
```json
{
  "homepage": "https://your-domain.com",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### For GitHub Pages, install:
```bash
npm install --save-dev gh-pages
```

---

## 🌐 Custom Domain Setup

### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Update DNS records (usually just CNAME)

### Vercel:
1. Project settings → Domains
2. Add custom domain
3. Follow DNS instructions

### GitHub Pages:
1. Repository settings → Pages
2. Add custom domain
3. Add CNAME file to `public/` folder

---

## 📱 Post-Deployment Testing

### Test These URLs:
- ✅ Homepage loads correctly
- ✅ All navigation links work
- ✅ Appointment booking form works
- ✅ Email service sends to brkkiprip@gmail.com
- ✅ Admin login works
- ✅ Mobile responsive design
- ✅ Contact information displays

---

## 🔒 Security Considerations

### Important:
- [ ] Remove any console.log statements
- [ ] Ensure admin credentials are secure
- [ ] Test form validation
- [ ] Verify HTTPS is enabled
- [ ] Check for any exposed API keys

---

## 📊 Monitoring & Analytics (Optional)

### Google Analytics:
1. Create Google Analytics account
2. Add tracking code to `public/index.html`
3. Monitor visitor statistics

### Form Submissions:
- Check your email (brkkiprip@gmail.com) regularly
- Monitor FormSubmit.co usage (if using)

---

## 🆘 Troubleshooting

### Common Issues:
1. **Blank page**: Check console for errors
2. **Forms not working**: Verify email service configuration
3. **Images not loading**: Check file paths
4. **Admin not accessible**: Verify credentials

### Debug Mode:
```bash
# Run in development mode
npm start

# Check for build errors
npm run build
```

---

## 📞 Support

### For Help:
- **Netlify**: netlify.com/support
- **Vercel**: vercel.com/support
- **GitHub**: github.com/support
- **Firebase**: firebase.google.com/support

---

## 🎉 Quick Start (Netlify)

1. **Build**: `npm run build`
2. **Go to**: netlify.com
3. **Drag & drop**: `build` folder
4. **Live!** 🚀

Your JediCare Medical Centre website will be live in minutes!
