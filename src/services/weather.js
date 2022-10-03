import { buildUrl } from '../utils/networking.js'

export default async (query) => {
  // Deal with missing params
  query.search = query.search.split(' ')
  const args = query.search.map(arg => {
    return arg.replaceAll(/,/gi, '').replaceAll(/ /gi, '')
  }).filter(arg => {
    return arg.length > 0
  })
  const url = buildUrl('wttr.in', [`${args.join(',')}_q0np.png`]).href
  return { message: url}
}
