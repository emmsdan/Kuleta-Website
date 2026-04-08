// @ts-nocheck
import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seeders/index.ts',
  },
  datasource: {
    // Empty fallback allows prisma generate to run in environments without DB access.
    url: process.env.DATABASE_URL ?? '',
    
  },
})
