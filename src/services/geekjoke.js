import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

export default async () => {
  const functionName = 'geekjoke'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  try {
    const url = networking.buildUrl('geek-jokes.sameerkumar.website/api?format=json')
    const response = await networking.makeRequest(url)
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: response } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorGeek')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
