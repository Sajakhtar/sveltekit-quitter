import supabase from './supabase'

export function getUser() {
  return supabase.auth.user()
}

export async function signIn({ email }) {
  const {error} = await supabase.auth.signIn({ email }) // pass in email only for magiclink
  return {data: !error, error}
}

export async function signOut() {
  const {error} = await supabase.auth.signOut()
  return {data: !error, error}
}

export async function createPost({content, user}) { // user is user's email
  const {data, error} = await supabase
      .from('posts')
      .insert({content, user})
    return {data, error}
}

export async function createLike({post, user}) { // post is posts's ID
  const {data, error} = await supabase
      .from('likes')
      .insert({post, user})
    return {data, error}
}

export async function createComment({post, user, content}) { // user is user's email
  const {data, error} = await supabase
      .from('comments')
      .insert({post, user, content})
    return {data, error}
}

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
    const [{count: likes, }, {data: comments, }, /*{publicURL}*/] = await Promise.all([
      await supabase
        .from('likes')
        .select('id', { count: 'estimated', head: true }) // fetching est count, not rows
        .eq('post', post.id),

      await supabase
        .from('comments')
        .select('*')
        .eq('post', post.id),

      // post.image ? await supabase.storage.from('images').getPublicUrl(post.image.split('/').slice(1).join('/')) : Promise.all()
    ])
    // ERROR handling can be added in a try catch here
    return {
      ...post, likes, comments
    }
  }))

  return {data, error}
}
