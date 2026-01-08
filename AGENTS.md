# AGENTS.md

This file contains guidelines for agentic coding assistants working in this repository.

## Project Overview

This is a Nuxt 4 application with Vue 3, TypeScript, and Tailwind CSS. It's a color manipulation tool that generates complementary colors and triadic color schemes.

## Development Commands

### Core Commands
- `yarn dev` - Start development server on localhost:3000
- `yarn build` - Build for production
- `yarn generate` - Generate static site
- `yarn preview` - Preview production build

### Linting
- ESLint is configured with `@nuxt/eslint` module
- Run linting with: `yarn lint` (if available) or check ESLint configuration
- No test framework is currently configured

## Code Style Guidelines

### Vue Components
- Use Single File Components (.vue) with Composition API
- Always use `<script setup lang="ts">` syntax
- Leverage Nuxt's auto-imports for Vue functions (ref, reactive, computed, etc.)
- Component files should use PascalCase naming (e.g., Button.vue)

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for complex objects
- Use type assertions sparingly; prefer type guards
- Leverage Nuxt's auto-generated types

### Import Patterns
- Use ES6 import syntax: `import { ref } from 'vue'`
- Nuxt auto-imports Vue composables and utility functions
- For third-party libraries, import at the top of the script section
- Use named imports over default imports when possible

### CSS/Styling
- Use Tailwind CSS classes for styling
- Follow Tailwind's utility-first approach
- Use @apply directive sparingly; prefer utility classes
- CSS classes should use kebab-case
- Responsive design with mobile-first approach

### File Structure
- Place components in `app/components/`
- Place pages in `app/pages/`
- Place shared styles in `app/assets/css/`
- Use kebab-case for page files (e.g., index.vue, about.vue)

## Naming Conventions

### Variables and Functions
- Use camelCase for JavaScript/TypeScript variables: `const primaryColor = ref('#ff0000')`
- Use descriptive function names: `getComplementaryColors`, `parseColorToHSL`
- Boolean variables should start with `is`, `has`, `can`, or `should`: `isValidColor`, `hasError`

### CSS Classes
- Use kebab-case for custom CSS classes: `.color-picker`, `.color-scheme`
- Follow Tailwind's naming conventions for utility classes

### Constants
- Use UPPER_SNAKE_CASE for constants: `const MAX_COLORS = 12`
- Define constants at the top of the file or in a separate constants file

## Error Handling

### Current Patterns
- Throw descriptive errors for invalid inputs: `throw new Error('Invalid color format')`
- Use console.log for debugging during development
- No centralized error handling is currently implemented

### Best Practices
- Validate user inputs and throw meaningful errors
- Use try-catch blocks for async operations
- Implement proper error boundaries in Vue components
- Log errors appropriately without exposing sensitive information

## Code Organization

### Component Structure
```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Imports
// Reactive state
// Computed properties
// Methods
// Lifecycle hooks
</script>

<style scoped>
/* Component-specific styles */
</style>
```

### Function Organization
- Place imports at the top
- Define reactive state next
- Follow with computed properties
- Then methods/functions
- Lifecycle hooks at the end

## Performance Considerations

### Vue Reactivity
- Use `ref` for primitive values and `reactive` for objects
- Prefer `computed` for derived state
- Avoid unnecessary reactivity for static data

### Tailwind CSS
- Use PurgeCSS (automatically configured by Nuxt)
- Avoid dynamic class generation when possible
- Use CSS variables for theme customization

## Development Workflow

### Before Making Changes
1. Read existing code to understand patterns
2. Check if similar functionality already exists
3. Follow existing naming and structure conventions

### After Making Changes
1. Test in development server
2. Check for ESLint errors
3. Ensure TypeScript compilation succeeds
4. Test responsive design if UI changes were made

## Testing

Currently no test framework is configured. When adding tests:
- Consider using Vitest for unit testing
- Use Vue Test Utils for component testing
- Follow AAA pattern (Arrange, Act, Assert)

## Security

- Never commit secrets or API keys
- Validate all user inputs
- Use HTTPS in production
- Sanitize user-generated content

## AI Assistant Guidelines

### When Working on This Codebase
1. Always use TypeScript for new code
2. Follow Vue 3 Composition API patterns
3. Use Tailwind CSS for styling
4. Maintain the existing file structure
5. Add proper error handling for new features
6. Write descriptive commit messages following conventional commits

### Things to Avoid
- Don't add unnecessary dependencies
- Don't use Options API (stick with Composition API)
- Don't inline styles unless absolutely necessary
- Don't ignore TypeScript errors
- Don't break existing functionality without proper testing

## Configuration Files

Key configuration files to be aware of:
- `nuxt.config.ts` - Main Nuxt configuration
- `eslint.config.mjs` - ESLint rules
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (if added)

## Getting Help

- Refer to Nuxt documentation: https://nuxt.com/docs
- Vue 3 documentation: https://vuejs.org/guide
- Tailwind CSS documentation: https://tailwindcss.com/docs