import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('coffee.alexflipnote.dev/random.json')
  const response = await makeRequest(url)
  return { payload: { image: response?.file } }
}
