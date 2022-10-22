import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('chew.pw/api/trbmb')
  const response = await makeRequest(url)
  return { payload: { message: response[0] } }
}
