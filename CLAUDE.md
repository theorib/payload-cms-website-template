# Claude Code Repository Guidelines

## TypeScript & Type Safety

**CRITICAL**: Always maintain strict type safety using the full power of the TypeScript type system.

- **NEVER use `any` types** unless absolutely necessary for external library compatibility
- Use proper type guards and runtime validation instead of type assertions when possible
- Leverage TypeScript's built-in utility types (`Pick`, `Omit`, `Partial`, etc.)
- Prefer type narrowing over type casting
- Use generic types to maintain type relationships
- Always use descriptive variable names when creating new variables

### Next.js Typed Routes

This project uses Next.js typed routes (`typedRoutes: true` in `next.config.ts`). For dynamic route construction:

```typescript
import type { Route } from 'next'

// For dynamically constructed routes, use type assertion
const href = `/${relationTo}/${slug}` as Route
```

## Code Quality Standards

### Linting & Type Checking

Always run these commands after making changes:

- `pnpm lint` - Check for linting errors
- `pnpm typecheck` - Verify TypeScript compilation

### Code Style

- Follow existing patterns and conventions in the codebase
- Check neighboring files for style guidance
- Use existing utilities and components before creating new ones
- Maintain consistent naming conventions
- **Do NOT change existing variable names** without asking permission first

## Common Patterns

### Link Components

When working with Next.js Link components:

- Import `Route` type for href typing
- Use type assertion for dynamic routes: `href={(dynamicHref) as Route}`
- Check existing components (`Card`, `Link`, `RichText`) for patterns

### Type Guards

Prefer runtime validation over unsafe type casting:

```typescript
// Good
if (typeof value !== 'object' || value === null) {
  throw new Error('Expected value to be an object')
}
if (!('slug' in value) || typeof value.slug !== 'string') {
  throw new Error('Expected value to have a slug property')
}

// Avoid
const slug = (value as { slug: string }).slug
```

## Project Structure

- Components in `/src/components/`
- Utilities in `/src/utilities/`
- Types from Payload CMS in `/src/payload-types.ts`
- Next.js app directory structure in `/src/app/`

## Key Dependencies

- **Next.js** with TypeScript and typed routes
- **Payload CMS** for content management
- **Tailwind CSS** for styling
- **Lexical** for rich text editing
