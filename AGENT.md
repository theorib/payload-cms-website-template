# AGENT.md

## Build/Lint/Test Commands

- `pnpm build` - Build the Next.js application
- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests with Vitest
- `pnpm test:e2e` - Run e2e tests with Playwright
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:e2e:debug` - Debug e2e tests
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm payload` - Run Payload CLI commands

## Architecture & Structure

- Next.js 15 with App Router in `src/app/`
- PayloadCMS v3 with SQLite database (`my-project.db`)
- Collections: Pages, Posts, Media, Categories, Users
- Globals: Header, Footer
- Admin interface at `/admin`
- Plugin system with form builder, nested docs, redirects, search, SEO
- Drizzle ORM for database operations
- Tailwind CSS with shadcn/ui components in `src/components/`

## Code Style & Conventions

- TypeScript with strict mode enabled
- ESLint with custom config enforcing type-only imports (`prefer: 'type-imports'`)
- Prettier with single quotes, no semicolons, trailing commas
- React components use `.tsx` extension
- Path aliases: `@/` for `src/`, `@payload-config` for payload config
- Generic array syntax preferred (`Array<T>` over `T[]`)
- Consistent type imports with inline style
