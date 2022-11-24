import { performance } from 'perf_hooks'
import search from 'youtube-search'
import { logger, metrics } from '@whatagoodbot/utilities'
import { clients } from '@whatagoodbot/rpc'

export default async payload => {
  const functionName = 'youtubeSearch'
  const startTime = performance.now()
  logger.debug({ event: functionName })
  metrics.count(functionName)
  if (!payload.nowPlaying.title || !payload.nowPlaying.artist) {
    const string = await clients.strings.get('youtubeNoTrackFound')
    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
  try {
    return new Promise(resolve => {
      search(`${payload.nowPlaying.title} by ${payload.nowPlaying.artist}`, { maxResults: 1, key: process.env.API_KEY_YOUTUBE }, async (err, results) => {
        if (err) {
          logger.error(err)
          const string = await clients.strings.get('errorYoutube')
          return resolve([{
            topic: 'broadcast',
            payload: {
              message: string.value
            }
          }])
        }
        const reply = [{ topic: 'broadcast', payload: { message: `${(results[0].thumbnails.medium.url) ? results[0].thumbnails.medium.url : ''} ${results[0].link}` } }]
        metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)
        return resolve(reply)
      })
    })
  } catch (error) {
    logger.error(error)
    metrics.count('error')
    const string = await clients.strings.get('errorYoutube')
    metrics.trackExecution(functionName, 'http', performance.now() - startTime, true)

    return [{ topic: 'broadcast', payload: { message: string.value } }]
  }
}
