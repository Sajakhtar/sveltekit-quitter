# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary


### Tailwind CSS & daisyUI

Svelte-add guide for [TailwindCSS](https://github.com/svelte-add/tailwindcss)

[daisyUI](https://daisyui.com/) for Tailwind CSS components.

```bash
npx svelte-add@latest tailwindcss

npm i daisyui
```

Add `require('daisyui')` to plugins array in `tailwind.config.cjs`

```js
plugins: [
    require('daisyui')
  ]
```


### Supabase

Setup Supabase as per this [blogpost](https://sjorswijsman.medium.com/setting-up-supabase-with-sveltekit-f6234fa1b54b)


```bash
npm install @supabase/supabase-js
```

Import this Supabase client from anywhere in our Svelte project by using:

```js
import supabase from '$lib/supabase'
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
