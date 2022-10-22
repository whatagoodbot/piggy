import { buildUrl, makeRequest } from '../utils/networking.js'

export default async () => {
  const url = buildUrl('corporatebs-generator.sameerkumar.website')
  const response = await makeRequest(url)
  return { payload: { message: response?.phrase } }
}
