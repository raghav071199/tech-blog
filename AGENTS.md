## Content sections

Three content collections (`src/content.config.ts`), all sharing one frontmatter schema:

| Collection | Directory | Route | Layout |
| --- | --- | --- | --- |
| `blog` | `src/content/blog/` | `/blog/` | `BlogPost.astro` |
| `knowledgeBase` | `src/content/knowledge-base/` | `/knowledge-base/` | `KnowledgeEntry.astro` |
| `fintech` | `src/content/fintech/` | `/fintech/` | `BlogPost.astro` |

### Blog vs Knowledge Base — keep these distinct

- **Blog** ("Deep Dives") — long-form, *one concrete scenario* reasoned through
  inductively: situation → naive baseline → why it breaks → build toward the ideal
  → trade-offs → takeaways. Diagrams expected. Narrative voice, hero image, STAR +
  Architecture framing. Resist declaring a best practice up front; let it earn its
  place.
- **Knowledge Base** ("Concepts & Notes") — short reference notes for things looked
  up more than once. Definitional and skimmable: one-line rule per concept, the
  smell/problem it fixes, a tight before/after snippet, and an **"At a glance"**
  summary table to close. No hero image. Uses `##`/`###` headings, which
  auto-populate the sticky table-of-contents rail.

Cross-link between sections liberally, and deep-link to specific headings when
referencing one concept (e.g. `/knowledge-base/solid-principles/#o--openclosed-principle`).

### Two shapes of Knowledge Base note

The KB holds two distinct kinds of note. Decide which one you're writing before the
first heading, because the closing section differs.

**Reference notes** ("survey" shape) — cover a *space* of options: several stores,
several protocols, several patterns, and the criteria for choosing between them. These
are the longer notes (~1,500–3,000 words), organised as one `###` per option, and they
**close with an "At a glance" table** — the table is the payoff, since the whole point
is comparison. `choosing-a-database`, `rest-graphql-grpc`, `design-patterns`.

**Concept notes** ("single idea" shape) — one small concept explained end to end, under
~1,000 words, meant to be read in one sitting rather than scanned. Arc:

1. **The problem** — the situation where the concept becomes necessary. Often a design
   that is fine until it scales, so show it working first.
2. **The subpar design** — the obvious approach, stated fairly, then the specific point
   at which it breaks. Concrete numbers over adjectives (`Scan reads 10,000,000 items
   to return 12`, `500 WCU per partition while 9,500 sit idle`).
3. **The concept, and what it costs** — what it actually is, and the trade it makes.
   Every concept costs something; a note that doesn't name the cost isn't finished.
4. **A worked example** — one real scenario carried through, ideally including a case
   that deliberately does *not* get the treatment, and why.
5. **When to reach for it, and when it's overkill** — both directions, explicitly. The
   overkill half is the more useful one and the more commonly omitted.
6. **A one-paragraph close** — the transferable model in a sentence, bolded.

**No "At a glance" table in a concept note.** The whole note is already the summary;
a table restating a 900-word post is padding. This is a deliberate exception to the
reference-note convention above, not an oversight. `global-secondary-indexes`,
`hot-partitions`.

Concept notes pair naturally — a mechanism and its failure mode, a pattern and its
cost. Cross-link them to each other rather than repeating the shared background, and
push anything survey-shaped out to the relevant reference note.

### Design Review posts (`Design Review` tag)

A Blog sub-genre for API/system design walkthroughs, often grown out of interview
practice. Same inductive arc as any Deep Dive, with a specific shape: state the
product and its numbers → sketch the *obvious* design honestly → walk the escalating
places it breaks (one `## Break N:` heading each) → close with the settled endpoint
surface, an explicit **"What I'd leave out of v1"**, and takeaways phrased as
transferable reflexes rather than facts about the example.

Two rules that matter more than the structure:

- **Author, don't transcribe.** Practice material is a graded transcript; the post is
  a single authored voice. Present reasoning as reasoning, not as correction. A
  mistake may appear where the *reflex* it teaches is the point (e.g. "anything the
  server can determine about the caller, the server must determine") — sparingly, at
  most one per post, and in an Aside so it reads as judgment rather than confession.
- **Be honest about what you skip.** Sections arguing *against* a thing — why almost
  nothing here is worth caching, what's cut from v1 — carry more weight than another
  endpoint list. Say what the trade buys.

Reference material belongs in the KB, not inline: deep-link to
`/knowledge-base/api-design-basics/` and `/knowledge-base/anatomy-of-an-http-request/`
at specific anchors instead of re-explaining verbs, status codes, or `ETag`s.

There is no `src/pages/tags/` route — tags render as display-only chips, so a new tag
is just a frontmatter string with no route to add.

## Writing MDX

Shared components: `import Aside from '../../components/Aside.astro'` and
`Mermaid.astro` — both are **default** exports (named imports fail).

Two gotchas that will silently break things:

1. **Mermaid diagrams must use the component**, not a fenced code block. MDX
   escapes the raw HTML that `astro-mermaid` emits, so a fenced `mermaid` block
   renders as literal source text. Always use `<Mermaid chart={...} />` with the
   diagram passed as a template-literal string prop.
2. **No nested double quotes in component props** — `title="a "quoted" word"`
   breaks the JSX parse. Use single quotes inside: `title="a 'quoted' word"`.

Hero images go in `src/assets/` and are referenced from frontmatter relative to the
content file (`heroImage: '../../assets/foo.jpg'`); Astro optimizes them to WebP.

## Git

Commit messages: imperative, concise, capitalized, no trailing period.
Example: `Add design patterns and database transactions notes to Knowledge Base`

Renaming a published entry's slug breaks live URLs — change the title only unless
the entry was never pushed.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Content collection or config changes can leave the dev server's content store
stale (new routes 404); restart with `astro dev stop` then `astro dev --background`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
