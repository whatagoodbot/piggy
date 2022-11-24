import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

const paths = ['api']

export default async payload => {
  const functionName = 'inspirobotGet'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  try {
    const searchParams = [
      ['generate', 'true']
    ]

    const url = networking.buildUrl('inspirobot.me', paths, searchParams)
    const message = await networking.makeRequest(url)
    metrics.trackExecution(functionName, 'mqtt', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorInspiro')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
