import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

export default async payload => {
  const functionName = 'urbanDictionary'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)
  metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

  try {
    let args = payload.arguments
    if (!args) {
      const string = await clients.strings.get('missingArgumentUrban')
      return {
        payload: {
          message: string.value
        }
      }
    }

    args = args.split(' ')
    const parsedArgs = args.map(arg => {
      return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
    }).filter(arg => {
      return arg.length > 0
    })
    const term = parsedArgs.join(' ')

    const url = networking.buildUrl('api.urbandictionary.com', ['v0', 'define'], [['term', term]])
    const response = await networking.makeRequest(url)
    const definition = response?.list[0]?.definition
    if (definition) {
      return [{ topic: 'broadcast', payload: { message: `${term}: ${response?.list[0]?.definition}` } }]
    }

    const string = await clients.strings.get('urbanNotFound')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: `${term}: ${string.value}` } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorUrban')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
