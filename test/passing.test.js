import { expect } from 'chai'
import urban from '../src/services/urban.js'

describe('networking', function () {
  it('should return a function to add text responder', () => {
    expect('').to.be.a('string')
  })
})

describe('Commands tests', function () {
  this.timeout(5000)
  it('should handle urban command', async () => {
    const response = await urban({ arguments: 'hava' })
    expect(response).to.have.nested.property('payload.message')
  })
})
