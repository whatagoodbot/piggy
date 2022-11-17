import { buildUrl, makeRequest } from '../utils/networking.js'
import { getString } from '../libs/grpc.js'

/**
 * Get a random motivational quote
 * 
 * Usage: /inspirational
 */
export default async (payload) => {
  // make the call
  const url = buildUrl('zenquotes.io', ['api', 'random'])
  const response = await makeRequest(url)

  // return definition message
  if (response[0] && response[0].q && response[0].a) {
    return { payload: { message: `“${response[0].q}” - ${response[0].a}` } }
  }

  // return error message
  const notFoundMessage = await getString('inspirationalNotFound')
  return { payload: { message: notFoundMessage.value } }
}
