import { buildUrl, makeRequest } from '../utils/networking.js'

const paths = ['v1', 'gifs', 'search']

export default async (query) => {
  // Deal with missing params
  const searchParams = [
    ['api_key', process.env.GIPHY_API_KEY],
    ['q', query.search],
    ['limit', 1],
    ['rating', 'g'],
    ['lang', 'en']
  ]

  const url = buildUrl('api.giphy.com', paths, searchParams)
  const response = await makeRequest(url)
  // Deal with Error
  return { images: [response?.data[0]?.images?.original?.url] }
}
