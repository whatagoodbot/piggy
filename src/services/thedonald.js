import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

export default async () => {
  const functionName = 'theDonald'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  try {
    const url = networking.buildUrl('api.whatdoestrumpthink.com/api/v1/quotes/random')
    const response = await networking.makeRequest(url)
    const string = await clients.strings.get('introThedonald')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: `${string.value} ${response?.message}` } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorTrump')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
