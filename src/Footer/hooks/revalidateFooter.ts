import type { GlobalAfterChangeHook } from 'payload'
import type { Footer } from '../../payload-types'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  const footerDoc = doc as Footer

  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag('global_footer')
  }

  return footerDoc
}
