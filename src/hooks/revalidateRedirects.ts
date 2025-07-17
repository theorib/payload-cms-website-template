import type { CollectionAfterChangeHook } from 'payload'
import type { Redirect } from '../payload-types'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  const redirectDoc = doc as Redirect
  
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects')

  return redirectDoc
}
