---
sidebar_position: 100
title: Author Guide
slug: author-guide
---

# Author Guide

This guide explains how to add author information to your WarpTorch blog posts and pages.

## Adding Authors to Posts

### Quick Start

To add an author to your blog post, simply use their key in the frontmatter:

```md
---
slug: my-post
title: My Blog Post
authors:
  - omar
tags: [example]
---
```

### Adding New Authors

To add a new author, update the `authors` section in `docusaurus.config.ts`:

```typescript
authors: {
  newauthor: {
    name: 'Jane Developer',
    title: 'Core Contributor',
    url: 'https://github.com/janedeveloper',
    image_url: 'https://github.com/janedeveloper.png',
    email: 'jane@warptorch.org',
    twitter: 'janedeveloper',
    linkedin: 'janedeveloper',
    github: 'janedeveloper',
  },
}
```

### Author Configuration Options

- **name**: Display name of the author (required)
- **title**: Job title or role (optional)
- **url**: Personal website or GitHub profile (optional)
- **image_url**: Profile image URL (optional, falls back to placeholder)
- **email**: Email address (optional)
- **twitter**: Twitter handle without @ (optional)
- **linkedin**: LinkedIn username (optional)
- **github**: GitHub username (optional)

### Multiple Authors

You can specify multiple authors for a single post:

```md
---
slug: collaborative-post
title: Collaborative Post
authors:
  - omar
  - janedeveloper
tags: [collaboration]
---
```

### Local Author Override

For one-off posts, you can override author information directly:

```md
---
slug: guest-post
title: Guest Post
authors:
  - name: Guest Author
    title: Visiting Researcher
    url: https://guest-university.edu/profile
    email: guest@university.edu
tags: [guest-post]
---
```

## Team Page

The `/team` page automatically displays all configured authors. To add someone to the team page, simply add their configuration to `docusaurus.config.ts`.

## Customization

### Author Card Styling

The author cards use CSS variables that respect your Docusaurus theme. To customize:

1. Edit `src/theme/AuthorCard.module.css`
2. Modify styles as needed
3. Restart development server

### Avatar Images

Use square images for best results. Recommended sizes:
- Blog posts: 80x80px
- Team page: 120x120px

Supported formats: PNG, JPG, SVG

### Social Links

The system automatically supports these social platforms:
- GitHub
- Twitter/X
- LinkedIn
- Email

To add more platforms, edit the `AuthorCard.tsx` component.

## Best Practices

1. **Use GitHub avatars**: They're automatically generated and reliable
2. **Keep author keys simple**: Use lowercase alphanumeric names
3. **Provide social links**: Encourage community engagement
4. **Update titles**: Keep roles current
5. **Use consistent naming**: Match GitHub usernames when possible

## Examples

### Basic Post

```md
---
slug: getting-started
title: Getting Started with WarpTorch
authors:
  - omar
tags: [tutorial, beginner]
---

This is a beginner-friendly tutorial...
```

### Guest Post

```md
---
slug: guest-warp-drives
title: Advanced Warp Drive Concepts
authors:
  - name: Dr. Einstein
    title: Guest Researcher
    url: https://university.edu/einstein
    email: einstein@university.edu
tags: [guest-post, physics]
---

This post explores advanced concepts...
```

### Team Collaboration

```md
---
slug: collaboration-announcement
title: New Partnership Announcement
authors:
  - omar
  - janedeveloper
  - name: Project Lead
    title: Research Director
tags: [announcement, partnership]
---

We're excited to announce...
```

## Troubleshooting

### Avatar Not Showing

- Check the image URL is accessible
- Verify the image format is supported
- Try clearing browser cache

### Social Links Not Working

- Ensure usernames are correct (no @ symbol)
- Verify profiles are public
- Check platform-specific URL formats

### Author Card Not Appearing

- Verify author key is correctly spelled
- Check `docusaurus.config.ts` for typos
- Restart development server after config changes

Need help? Open an issue on [GitHub](https://github.com/just-omar/WarpTorch/issues)!
