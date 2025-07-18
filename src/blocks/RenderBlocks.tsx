import type React from 'react'
import { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

export type PageLayoutBlocks = NonNullable<Page['layout']> | null | undefined

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
} as const

type BlockSlugs = keyof typeof blockComponents

function isValidBlockType(blockType: string): blockType is BlockSlugs {
  return blockType in blockComponents
}

export const RenderBlocks: React.FC<{
  blocks: PageLayoutBlocks
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const key = `${blockType || 'unknown'}-${index}`

        if (!blockType || !isValidBlockType(blockType)) {
          console.warn(`Unknown or missing block type: ${String(blockType)}`)
          return null
        }

        const Block = blockComponents[
          blockType
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as React.ComponentType<any>

        return (
          <div className="my-16" key={key}>
            <Block {...block} disableInnerContainer />
          </div>
        )
      })}
    </Fragment>
  )
}
