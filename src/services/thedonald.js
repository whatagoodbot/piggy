import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('api.whatdoestrumpthink.com/api/v1/quotes/random')
  const response = await makeRequest(url)
  return { payload: { message: `Donald once said: ${response?.message}` } }
}
