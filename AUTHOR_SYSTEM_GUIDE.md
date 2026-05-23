# ✨ Author System Quick Start

Congratulations! Your WarpTorch documentation now has a powerful author system with:

## 🎯 What's New

- **Author Cards**: Beautiful cards with avatars, names, and social links
- **Team Page**: Automatic team directory at `/team`
- **Social Links**: GitHub, Twitter, LinkedIn, Email integration
- **Multi-Author Support**: Collaborative posts with multiple authors
- **Guest Authors**: One-time authors with full customization

## 🚀 Quick Start

### Adding an Author to a Post

```md
---
slug: my-post
title: My New Post
authors:
  - omar  # Use the author key from authors.yml
tags: [example]
---
```

### Adding a New Author

Edit `docs/blog/authors.yml`:

```yaml
newauthor:
  name: Jane Developer
  title: Core Contributor
  url: https://github.com/janedeveloper
  image_url: https://github.com/janedeveloper.png
  email: jane@example.com
  twitter: janedeveloper
  linkedin: janedeveloper
  github: janedeveloper
```

### Guest Author (One-Time)

```md
---
slug: guest-post
title: Guest Post
authors:
  - name: Dr. Guest
    title: Visiting Researcher
    url: https://university.edu/profile
    email: guest@university.edu
tags: [guest-post]
---
```

## 📁 File Structure

```
docs/
├── blog/
│   ├── authors.yml          # Author database
│   └── 2024-05-23-welcome/
│       └── index.md         # Example post
├── src/
│   ├── theme/
│   │   ├── AuthorCard.tsx          # Author card component
│   │   ├── AuthorCard.module.css   # Card styles
│   │   └── BlogPostItem/
│   │       └── index.tsx           # Blog integration
│   ├── pages/
│   │   ├── team.tsx                # Team page
│   │   └── team.module.css         # Team styles
│   └── css/
│       └── custom.css              # Your custom styles
├── docusaurus.config.ts     # Global config with authors
└── docs/
    ├── author-guide.md      # Detailed guide
    └── author-examples.md   # Examples
```

## 🎨 Customization

### Styling Author Cards

Edit `docs/src/theme/AuthorCard.module.css`:
- Colors, sizes, spacing
- Avatar styles
- Social link appearance
- Hover effects

### Team Page Styling

Edit `docs/src/pages/team.module.css`:
- Grid layout
- Card designs
- Responsive breakpoints

## 🧪 Testing

Start the development server:

```bash
cd docs
npm run start
```

Visit:
- Blog: `http://localhost:3000/blog`
- Team: `http://localhost:3000/team`
- Example post: `http://localhost:3000/blog/welcome`

## 📝 Configuration Options

### Author Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Display name |
| `title` | string | ❌ | Job title or role |
| `url` | string | ❌ | Personal website or profile |
| `image_url` | string | ❌ | Profile picture URL |
| `email` | string | ❌ | Email address |
| `twitter` | string | ❌ | Twitter handle (no @) |
| `linkedin` | string | ❌ | LinkedIn username |
| `github` | string | ❌ | GitHub username |

### Social Links

Supported platforms:
- GitHub (`github: username`)
- Twitter/X (`twitter: username`) 
- LinkedIn (`linkedin: username`)
- Email (`email: address`)

## 🎯 Best Practices

1. **Use GitHub avatars**: Reliable and automatically generated
2. **Keep keys simple**: Lowercase, alphanumeric (e.g., `omar`, `janedoe`)
3. **Provide social links**: Encourages community engagement
4. **Update titles**: Keep roles current
5. **Test locally**: Check author cards before publishing

## 🔄 Next Steps

1. ✅ Author system is installed and configured
2. 📝 Add your team members to `blog/authors.yml`
3. 🎨 Customize styles if needed
4. 🚀 Create your first multi-author post
5. 👥 Share the team page URL

## 📚 Documentation

- [Detailed Author Guide](/docs/author-guide)
- [Author Examples](/docs/author-examples)
- [Docusaurus Blog Docs](https://docusaurus.io/docs/blog)

## 🤝 Contributing

Want to improve the author system?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Need help?** Open an issue on [GitHub](https://github.com/just-omar/WarpTorch/issues)!

Enjoy building your community! 🎉
