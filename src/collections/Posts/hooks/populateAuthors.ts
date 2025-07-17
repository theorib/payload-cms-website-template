import type { CollectionAfterReadHook } from 'payload'
import { type User, type Post } from 'src/payload-types'

interface PostWithPopulatedAuthors extends Post {
  populatedAuthors?: Array<{
    id?: string | null
    name?: string | null
  }> | null
}

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  const postDoc = doc as PostWithPopulatedAuthors

  if (postDoc?.authors && postDoc?.authors?.length > 0) {
    const authorDocs: Array<User> = []

    for (const author of postDoc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author.id : author,
          collection: 'users',
          depth: 0,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }

        if (authorDocs.length > 0) {
          postDoc.populatedAuthors = authorDocs.map(authorDoc => ({
            id: authorDoc.id?.toString() || null,
            name: authorDoc.name || null,
          }))
        }
      } catch {
        // swallow error
      }
    }
  }

  return postDoc
}
