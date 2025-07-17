import { type BeforeSync, type DocToSync } from '@payloadcms/plugin-search/types'
import type { Post } from '../payload-types'

interface SearchDocMeta {
  title?: string | null
  image?: string | number | null
  description?: string | null
}

interface SearchDocCategory {
  relationTo: 'categories'
  categoryID: string
  title: string
}

interface TypedDocToSync extends DocToSync {
  slug?: string | null
  meta?: SearchDocMeta
  categories?: Array<SearchDocCategory>
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const postDoc = originalDoc as Post
  const { slug, id, categories, title, meta } = postDoc

  const modifiedDoc: TypedDocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: typeof meta?.image === 'object' && meta?.image !== null ? meta.image.id : meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: Array<{ id: string | number; title: string }> = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push({ id: category.id, title: category.title })
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push({ id: doc.id, title: doc.title })
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map(each => ({
      relationTo: 'categories' as const,
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
