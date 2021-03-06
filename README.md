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

In Supabase UI
- create a new table named `posts`
- create a column named `user` (type `varchar`) and link it to the `users` built-in table for auth, with *reference* to `email` specficially
- create a column named `content` with type `text`, not nullable
- create a column named `image`
  - add foreign key, then select `objects` and then `name`
  - Allow nullable
- Save table
- In LHS navigation, go to Authentication, then Policies,
  - To create a read-only policy open to everyone (inc. non-logged-in users), select
    - `New Policy`
    - `Create policy from template`
    - `Enable read access to everyone`
    - `use this template`
    - `Review`
    - `Save policy`
  - To create a policy for authenticated user to only create posts, select
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
- create a new table named `likes`
  - create a column named `user` (type `varchar`) and link it to the `users` built-in table for auth, with *reference* to `email` specficially, and not nullable
  - create a colum named `post`,  with *reference* to `posts` table (the post ID specifically), and non nullable
  - In LHS navigation, go to Authentication, then Policies,
    - Create a read-only policy open to everyone (inc. non-logged-in users)
    - Create a policy for authenticated user to only create likes
- create a new table named `comments`
  - create a colum named `content` with type `text`, not nullable
  - create a column named `user` (type `varchar`) and link it to the `users` built-in table for auth, with *reference* to `email` specficially, and not nullable
  - create a colum named `post`,  with *reference* to `posts` table (the post ID specifically), and non nullable
  - In LHS navigation, go to Authentication, then Policies,
    - Create a read-only policy open to everyone (inc. non-logged-in users)
    - Create a policy for authenticated user to only create a comment
  - To create a policy for a user to update comments, select
    - `New Policy`
    - `Create policy from template`
    - `Enable update access for users based on their email *`
    - USING expression: `auth.email() = user`
    - WITH CHECK expresion: `auth.email() = user`
  - To create a policy for a user to delete comments, select
    - `New Policy`
    - `Create policy from template`
    - `Enable delete access for users based on their user ID *`
    - USING expression: `auth.email() = user`

#### Storage

Navigate to `Storage` in Supabase and create a new bucket named `images`, toggles the bucket to be public.

Select `Policies` within the `Storage` menu, and create a new policy under `Other policies under storage.objects`, select:
- create policy for read for everyone
  - `Create policy from template`
  - `Enable read access to everyone`
- create policy authenticated users to upload images
  - `Create policy from template`
  - `Enable insert access for authenticated users only`

### Svelte Cubed

[Svelte Cubed](https://svelte-cubed.vercel.app/) site and documentation

Install dependancies
```bash
npm install three
npm install svelte-cubed
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
