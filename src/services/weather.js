import { buildUrl } from '../utils/networking.js'

export default async (args) => {
  if (!args) {
    return {
      topic: 'responseRead',
      payload: {
        key: 'missingArgumentWeather',
        category: 'system'
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
