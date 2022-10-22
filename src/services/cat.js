import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('api.thecatapi.com/v1/images/search')
  const response = await makeRequest(url)
  return { payload: { image: response[0].url } }
}
