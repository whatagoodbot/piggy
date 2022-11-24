import { performance } from 'perf_hooks'
import { logger, metrics, networking } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

const paths = ['v1', 'gifs', 'search']

export default async payload => {
  const functionName = 'giphy'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)
  try {
    if (!payload.arguments) {
      const string = await clients.strings.get('missingArgumentGiphy')
      return [{
        topic: 'broadcast',
        payload: {
          message: string.value
        }
      }]
    }
    const searchParams = [
      ['api_key', process.env.API_KEY_GIPHY],
      ['q', payload.arguments],
      ['limit', 1],
      ['rating', 'g'],
      ['lang', 'en']
    ]

    const url = networking.buildUrl('api.giphy.com', paths, searchParams)
    const response = await networking.makeRequest(url)
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
    return [{ topic: 'broadcast', payload: { message: response?.data[0]?.images?.original?.url } }]
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorGiphy')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
