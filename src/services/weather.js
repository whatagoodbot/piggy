import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

export default async payload => {
  const functionName = 'weather'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)

  try {
    let args = payload.arguments
    if (!args) {
      const string = await clients.strings.get('missingArgumentWeather')
      return [{
        topic: 'broadcast',
        payload: {
          message: string.value
        }
      }]
    }
    args = args.split(' ')
    const parsedArgs = args.map(arg => {
      return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
    }).filter(arg => {
      return arg.length > 0
    })
    const url = networking.buildUrl('wttr.in', [`${parsedArgs.join(',')}_q0np.png`]).href
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: url } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorWeather')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
