import search from 'youtube-search'
import { getString } from '../libs/grpc.js'

export default async (payload) => {
  return new Promise((resolve, reject) => {
    search(`${payload.nowPlaying.title} by ${payload.nowPlaying.artist}`, { maxResults: 1, key: process.env.YOUTUBE_API_KEY }, async (err, results) => {
      if (err) {
        const string = await getString('youtubeError')
        return resolve({
          payload: {
            message: string.value
          }
        })
      }
      const reply = { payload: { message: results[0].link } }
      if (results[0].thumbnails.medium.url) reply.payload.image = results[0].thumbnails.medium.url
      return resolve(reply)
    })
  })
}
