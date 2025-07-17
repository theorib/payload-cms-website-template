import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URI: z.string(),
    PAYLOAD_SECRET: z.string().min(20),
    CRON_SECRET: z.string().min(20),
    PREVIEW_SECRET: z.string().min(20),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: z.url(),
  },

  runtimeEnv: {
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
  },
})
