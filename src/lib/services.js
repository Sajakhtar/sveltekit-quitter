import supabase from './supabase'

// GET USER
export function getUser() {
  return supabase.auth.user()
}

// SIGN IN
export async function signIn({ email }) {
  const {error} = await supabase.auth.signIn({ email }) // pass in email only for magiclink
  return {data: !error, error}
}

// SIGN OUT
export async function signOut() {
  const {error} = await supabase.auth.signOut()
  return {data: !error, error}
}

// CREATE POST
export async function createPost({content, user, imageFile}) { // user is user's email
  if (imageFile) {

    const {data: imageData, error: imageError} = await supabase
      .storage
      .from('images')
      .upload(getUser().email + '/' + Date.now(), imageFile, {
        cacheControl: '3600',
        upsert: false
      })

      if (imageError) return {data: null, error: imageError}

      const {data, error} = await supabase
        .from('posts')
        .insert({content, user, image: imageData.Key})
      return {data, error}

  } else {
    const {data, error} = await supabase
        .from('posts')
        .insert({content, user})
      return {data, error}
  }
}

// CREATE LIKE
export async function createLike({post, user}) { // post is posts's ID
  const {data, error} = await supabase
      .from('likes')
      .insert({post, user})
    return {data, error}
}

// CREATE COMMENT
export async function createComment({post, user, content}) { // user is user's email
  const {data, error} = await supabase
      .from('comments')
      .insert({post, user, content})
    return {data, error}
}

// GET POSTS
export async function getPosts() {

  // posts
  let {data, error} = await supabase
    .from('posts')
    .select('*')
    .order('created_at', {ascending: false})
    .limit(5)

  if (error) return {data, error}

  // comments and likes for the posts
  data = await Promise.all(data.map(async (post) => {
    const [{count: likes, }, {data: comments, }, {publicURL}] = await Promise.all([
      await supabase
        .from('likes')
        .select('id', { count: 'estimated', head: true }) // fetching est count, not rows
        .eq('post', post.id),

      await supabase
        .from('comments')
        .select('*')
        .eq('post', post.id),

      post.image ? await supabase.storage.from('images').getPublicUrl(post.image.split('/').slice(1).join('/')) : Promise.resolve({})
    ])
    // ERROR handling can be added in a try catch here
    return {
      ...post, likes, comments, publicURL
    }
  }))

  return {data, error}
}
