import { buildUrl, makeRequest } from '../utils/networking.js'
import { getString } from '../libs/grpc.js'

/**
 * Mention a User with a compliment
 * 
 * Usage: /compliment @username
 */
export default async (payload) => {
  let args = payload.arguments
  // Check that term has been passed
  if (!args) {
    const string = await getString('missingArgumentCompliment')
    return {
      payload: {
        message: string.value
      }
    }
  }

  // formatting user
  args = args.split(' ')
  const parsedArgs = args.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const user = parsedArgs.join(' ')

  // make the call
  const url = buildUrl('complimentr.com', ['api'])
  const response = await makeRequest(url)

  // return definition message
  const message = response?.compliment
  if (message) {
    return { payload: { message: `@${user} ${message}` } }
  }

  // return error message
  const notFoundMessage = await getString('complimentNotFound')
  return { payload: { message: notFoundMessage.value } }
}
