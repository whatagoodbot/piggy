import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

/**
 * Get a random motivational quote
 *
 * Usage: /zen
 */
export default async payload => {
  const functionName = 'inspirobotGet'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  const url = networking.buildUrl('zenquotes.io', ['api', 'random'])
  const response = await networking.makeRequest(url)

  // return definition message
  if (response[0] && response[0].q && response[0].a) {
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: `“${response[0].q}” - ${response[0].a}` } }]
  }

  // return error message
  const notFoundMessage = await clients.strings.get('inspirationalNotFound')
  metrics.trackExecution(functionName, 'http', performance.now() - startTime, false)
  return [{ topic: 'broadcast', payload: { message: notFoundMessage.value } }]
}
