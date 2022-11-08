import { buildUrl, makeRequest } from '../utils/networking.js'
import { getString } from '../libs/grpc.js'

/**
 * Get Urban definition of a term
 */
export default async (payload) => {
  let args = payload.arguments
  // Check that term has been passed
  if (!args) {
    const string = await getString('missingArgumentUrban')
    return {
      payload: {
        message: string.value
      }
    }
  }

  // formatting term
  args = args.split(' ')
  const parsedArgs = args.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const term = parsedArgs.join(' ')

  // make the call
  const url = buildUrl('api.urbandictionary.com', ['v0', 'define'], [['term', term]])
  const response = await makeRequest(url)

  // return definition message
  const definition = response?.list[0]?.definition
  if (definition) {
    return { payload: { message: `${term}: ${response?.list[0]?.definition}` } }
  }

  // return error message
  const notFoundMessage = await getString('urbanNotFound')
  return { payload: { message: `${term}: ${notFoundMessage.value}` } }
}
