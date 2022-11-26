import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

/**
 * Mention a User with a compliment
 *
 * Usage: /compliment @username
 */
export default async (payload) => {
  const functionName = 'inspirobotGet'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  let args = payload.arguments
  // Check that term has been passed
  if (!args) {
    const string = await clients.strings.get('missingArgumentCompliment')
    return {
      payload: {
        message: string.value
      }
    }
  }

  // formatting user
  args = args.split(' ')
  const parsedArgs = args.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const user = parsedArgs.join(' ')

  // make the call
  const url = networking.buildUrl('complimentr.com', ['api'])
  const response = await networking.makeRequest(url)

  // return definition message
  const message = response?.compliment
  if (message) {
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: `@${user} ${message}` } }]
  }

  // return error message
  const notFoundMessage = await clients.strings.get('complimentNotFound')
  metrics.trackExecution(functionName, 'http', performance.now() - startTime, false)
  return [{ topic: 'broadcast', payload: { message: notFoundMessage.value } }]
}
