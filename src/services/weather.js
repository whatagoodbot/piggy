import { buildUrl } from '../utils/networking.js'
import { getString } from '../libs/grpc.js'

export default async (payload) => {
  let args = payload.arguments
  if (!args) {
    const string = await getString('missingArgumentWeather')
    return {
      payload: {
        message: string.value
      }
    }
  }
  args = args.split(' ')
  const parsedArgs = args.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const url = buildUrl('wttr.in', [`${parsedArgs.join(',')}_q0np.png`]).href
  return { payload: { image: url } }
}
