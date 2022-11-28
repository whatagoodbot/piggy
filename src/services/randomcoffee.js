import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'

export default async () => {
  const functionName = 'randomCoffee'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  try {
    const url = networking.buildUrl('coffee.alexflipnote.dev/random.json')
    const response = await networking.makeRequest(url)
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: response?.file } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
  }
}
