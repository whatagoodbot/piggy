import broker from '@whatagoodbot/mqtt'
import services from './services/index.js'
import { logger, metrics } from '@whatagoodbot/utilities'

const topicPrefix = `${process.env.NODE_ENV}/`

const subscribe = () => {
  const topic = 'externalRequest'
  broker.client.subscribe(`${topicPrefix}${topic}`, (err) => {
    logger.info({ event: 'topicSubscription', topic })
    if (err) {
      logger.error({
        error: err.toString(),
        topic
      })
    }
  })
}

if (broker.client.connected) {
  subscribe()
} else {
  broker.client.on('connect', subscribe)
}

broker.client.on('error', logger.error)

broker.client.on('message', async (fullTopic, data) => {
  const functionName = 'receivedMessage'
  const startTime = performance.now()
  const topic = fullTopic.substring(topicPrefix.length)
  logger.debug({ event: functionName, topic })

  let requestPayload
  try {
    requestPayload = JSON.parse(data.toString())
    const validatedRequest = broker[topic].validate(requestPayload)
    if (validatedRequest.errors) throw { message: validatedRequest.errors } // eslint-disable-line
    if (validatedRequest.service !== process.env.npm_package_name) return
    const processedResponses = await services[validatedRequest.command](validatedRequest)
    if (!processedResponses || !processedResponses.length) return
    for (const current in processedResponses) {
      const processedResponse = processedResponses[current]
      const validatedResponse = broker[processedResponse.topic].validate({
        ...validatedRequest,
        ...processedResponse.payload
      })
      if (validatedResponse.errors) throw { message: validatedResponse.errors } // eslint-disable-line
      if (processedResponse.topic && !process.env.FULLDEBUG) {
        logger.debug({ event: 'Publishing', topic: processedResponse.topic })
        broker.client.publish(`${topicPrefix}${processedResponse.topic}`, JSON.stringify(validatedResponse))
      }
    }
    metrics.trackExecution(functionName, 'mqtt', performance.now() - startTime, true, { topic })
  } catch (error) {
    logger.error(error)
    logger.debug({ topic, requestPayload })
  }
})
