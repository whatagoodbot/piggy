import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('meowfacts.herokuapp.com')
  const response = await makeRequest(url)
  return { payload: { message: response?.data[0] } }
}
