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
