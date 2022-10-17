import { buildUrl } from '../utils/networking.js'

export default async (payload) => {
  if (!payload.search) {
    return {
      topic: 'responseRead',
      payload: {
        key: 'missingArgumentWeather',
        category: 'system'
      }
    }
  }
  payload.search = payload.search.split(' ')
  const args = payload.search.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const url = buildUrl('wttr.in', [`${args.join(',')}_q0np.png`]).href
  return { payload: { image: url } }
}
