import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('geek-jokes.sameerkumar.website/api?format=json')
  const response = await makeRequest(url)
  return { payload: { message: response?.joke } }
}
