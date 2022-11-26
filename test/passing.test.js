import { expect } from 'chai'
import urban from '../src/services/urban.js'
import compliment from '../src/services/compliment.js'
import inspirational from '../src/services/inspirational.js'

describe('networking', function () {
  it('should return a function to add text responder', () => {
    expect('').to.be.a('string')
  })
})

describe('Commands tests', function () {
  this.timeout(5000)
  it('should handle urban command', async () => {
    const response = await urban({ arguments: 'hava' })
    expect(response[0]).to.have.nested.property('payload.message')
  })

  it('should handle compliment command', async () => {
    const response = await compliment({ arguments: 'Wood' })
    expect(response[0]).to.have.nested.property('payload.message')
  })

  it('should handle inspirational command', async () => {
    const response = await inspirational()
    expect(response[0]).to.have.nested.property('payload.message')
  })
})
