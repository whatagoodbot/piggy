import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('randomfox.ca/floof')
  const response = await makeRequest(url)
  return { payload: { image: response?.image } }
}
