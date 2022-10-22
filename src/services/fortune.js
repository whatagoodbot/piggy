import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('fortuneapi.herokuapp.com')
  const response = await makeRequest(url)
  return { payload: { message: response.replace(/[\n\t\r]/g, '') } }
}
