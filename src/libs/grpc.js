import { clientCreds, strings } from '@whatagoodbot/rpc'

const stringService = new strings.Strings(`${process.env.RPC_MISS_GROUPIE}:${process.env.RPC_MISS_GROUPIE_PORT || '50051'}`, clientCreds)

export const getString = string => {
  return new Promise(resolve => {
    stringService.getString({ string }, (error, response) => {
      if (error) console.log(error)
      resolve(response)
    })
  })
}

export const getManyStrings = strings => {
  return new Promise(resolve => {
    stringService.getManyStrings({ strings }, (error, response) => {
      if (error) console.log(error)
      resolve(response)
    })
  })
}
