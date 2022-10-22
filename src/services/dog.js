import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('dog.ceo/api/breeds/image/random')
  const response = await makeRequest(url)
  return { payload: { image: response?.message } }
}
