import { buildUrl, makeRequest } from '../utils/networking.js'
import { getString } from '../libs/grpc.js'

const paths = ['v1', 'gifs', 'search']

export default async (payload) => {
  if (!payload.arguments) {
    const string = await getString('missingArgumentGiphy')
    return {
      payload: {
        message: string.value
      }
    }
  }
  const searchParams = [
    ['api_key', process.env.GIPHY_API_KEY],
    ['q', payload.arguments],
    ['limit', 1],
    ['rating', 'g'],
    ['lang', 'en']
  ]

  const url = buildUrl('api.giphy.com', paths, searchParams)
  const response = await makeRequest(url)
  // Deal with Error
  return { payload: { image: response?.data[0]?.images?.original?.url } }
}
