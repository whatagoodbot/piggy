import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('api.kanye.rest')
  const response = await makeRequest(url)
  return { payload: { message: `Kanye said: ${response?.quote}` } }
}
