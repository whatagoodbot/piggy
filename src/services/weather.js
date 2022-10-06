import { buildUrl } from '../utils/networking.js'

export default async (payload) => {
  // Deal with missing params
  payload.search = payload.search.split(' ')
  const args = payload.search.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const url = buildUrl('wttr.in', [`${args.join(',')}_q0np.png`]).href
  return { image: url }
}
