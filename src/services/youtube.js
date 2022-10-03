import search from 'youtube-search'

export default async (query) => {
  // Deal with missing params
  return new Promise(resolve => {
    search(`${query.song} by ${query.artist}`, { maxResults: 1, key: process.env.YOUTUBE_API_KEY }, async (err, results) => {
      if (err) {
        // Deal with Error
        // resolve({ message: await stringsDb.get('youtubeNotFound') })
      }
      const reply = {message: results[0].link}
      if (results[0].thumbnails.medium.url) reply.burt = [results[0].thumbnails.medium.url]
      resolve(reply)
    })
  })
}

