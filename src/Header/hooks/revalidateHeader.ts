import type { GlobalAfterChangeHook } from 'payload'
import type { Header } from '../../payload-types'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  const headerDoc = doc as Header
  
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header')
  }

  return headerDoc
}
