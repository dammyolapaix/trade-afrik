import { Redis } from '@upstash/redis'

import { env } from '@/env/server'

const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
})

export default redis
