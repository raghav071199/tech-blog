# tech-blog

This is a public repo for my personal tech blog — deep dives on distributed systems, auto-scaling, CI/CD, and Android architecture.

Built with [Astro](https://astro.build/) (blog starter), MDX content collections, and Mermaid diagrams. Deployed on Vercel.

## 🚀 Project Structure

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/blog/     # MDX / MD posts
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

The `src/content/blog/` directory contains the posts. Frontmatter is type-checked against the schema in `src/content.config.ts` (`title`, `description`, `pubDate`, `tags`, `featured`, …).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 👀 Want to learn more?

Check out [Astro's documentation](https://docs.astro.build).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
