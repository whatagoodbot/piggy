import search from 'youtube-search'

export default async (payload, meta) => {
  return new Promise((resolve, reject) => {
    search(`${meta.song} by ${meta.artist}`, { maxResults: 1, key: process.env.YOUTUBE_API_KEY }, async (err, results) => {
      if (err) {
        return reject(err)
      }
      const reply = { message: results[0].link }
      if (results[0].thumbnails.medium.url) reply.image = results[0].thumbnails.medium.url
      return resolve(reply)
    })
  })
}
