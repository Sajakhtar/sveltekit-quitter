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

#### Tables

##### Posts
In Supabase UI
- create a new table named `posts`
- create a column named `user` (type `varchar`) and link it to the `users` built-in table for auth, with *reference* to `email` specficially
- create a colum named `content` with type `text`
- Save table
- In LHS navigation, go to Authentication, then Policies,
  - To create a read-only policy open to everyone (inc. non-logged-in users), select
    - `New Policy`
    - `Create policy from template`
    - `Enable read access to everyone`
    - `use this template`
    - `Review`
    - `Save policy`
  - To creat a policy for authenticated user to only create posts, select
    - `New Policy`
    - `Create policy from template`
    - `Enable insert access for authenticated users only`
    - `use this template`
    - `Review`
    - `Save policy`
  - To create a policy for no one to update posts, select
    - `New Policy`
    - `Create a policy from scratch`
    - Policy name: `No updates`
    - Allowed operation: `update`
    - USING expression: `false`
    - WITH CHECK expresion: `false`
  - To creat a policy for authenticated user to delete their own posts, select
    - `New Policy`
    - `Create policy from template`
    - `Enable delete access for users based on their user ID *`
    - `use this template`
    - Replace policy name with: `Enable delete for users based on user email`
    - Replace using USING expression with `auth.email = user`
    - `Review`
    - `Save policy`

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
