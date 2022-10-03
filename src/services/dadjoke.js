import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('icanhazdadjoke.com')
  const response = await makeRequest(url)
  return { message: response?.joke }
}
