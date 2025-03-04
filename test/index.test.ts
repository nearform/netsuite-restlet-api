import { beforeEach, before, afterEach, mock, describe, it } from 'node:test'
import { MockAgent, setGlobalDispatcher } from 'undici'
import assert from 'node:assert'
import {
  MOCK_CONFIG,
  MOCK_NETSUITE_API_RESPONSE,
  MOCK_TOKEN_API_RESPONSE
} from '../mocks'

describe('NetSuiteClient.get', () => {
  const kjurSignMock = mock.fn()
  let agent
  let NetSuiteClient

  beforeEach(() => {
    agent = new MockAgent()
    setGlobalDispatcher(agent)
  })

  before(async () => {
    mock.module('jsrsasign', {
      namedExports: {
        KJUR: {
          jws: {
            JWS: {
              sign: kjurSignMock
            }
          }
        }
      }
    })

    const index = await import(`../src/index?${Date.now()}`)
    NetSuiteClient = index.NetSuiteClient
  })

  afterEach(() => {
    kjurSignMock.mock.resetCalls()
  })

  it('Should retrieve data', async () => {
    agent
      .get('https://token.com')
      .intercept({
        path: 'some-endpoint',
        method: 'POST'
      })
      .reply(200, MOCK_TOKEN_API_RESPONSE)

    agent
      .get('https://restlet.com')
      .intercept({
        path: 'some-endpoint',
        method: 'GET'
      })
      .reply(200, MOCK_NETSUITE_API_RESPONSE)

    const client = new NetSuiteClient(MOCK_CONFIG)
    const response = await client.get('https://restlet.com/some-endpoint')

    assert.deepStrictEqual(response, MOCK_NETSUITE_API_RESPONSE)
  })

  it('Should reuse access token if present already', async () => {
    agent
      .get('https://token.com')
      .intercept({
        path: 'some-endpoint',
        method: 'POST'
      })
      .reply(200, MOCK_TOKEN_API_RESPONSE)

    agent
      .get('https://restlet.com')
      .intercept({
        path: 'some-endpoint',
        method: 'GET'
      })
      .reply(200, MOCK_NETSUITE_API_RESPONSE)
      .times(2)

    const client = new NetSuiteClient(MOCK_CONFIG)
    await client.get('https://restlet.com/some-endpoint')
    await client.get('https://restlet.com/some-endpoint')

    assert.strictEqual(kjurSignMock.mock.calls.length, 1)
  })
})
