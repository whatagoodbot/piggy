import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('uselessfacts.jsph.pl/random.json')
  const response = await makeRequest(url)
  return { payload: { message: response?.text } }
}
