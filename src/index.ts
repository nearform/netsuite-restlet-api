import { KJUR } from 'jsrsasign'
import { Config } from './types'

export class NetSuiteClient {
  private config: Config
  private accessToken: string = ''
  private expiresIn: Date = new Date()

  constructor(config: Config) {
    this.config = config
  }

  private createRequestToken = () => {
    const header = {
      alg: 'PS256',
      typ: 'JWT',
      kid: this.config.certificateId
    }
    const payload = {
      iss: this.config.clientId,
      scope: ['restlets', 'rest_webservices'],
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
      aud: this.config.tokenUrl
    }

    return KJUR.jws.JWS.sign(
      'PS256',
      JSON.stringify(header),
      JSON.stringify(payload),
      this.config.privateKey
    )
  }

  private async getAccessToken() {
    if (this.expiresIn > new Date()) {
      return this.accessToken
    }

    const requestBody = new URLSearchParams()
    requestBody.append('grant_type', 'client_credentials')
    requestBody.append(
      'client_assertion_type',
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    )
    requestBody.append('client_assertion', this.createRequestToken())

    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: requestBody.toString()
    })

    const { access_token, expires_in } = await response.json()

    this.expiresIn = new Date(Date.now() + expires_in * 1000)
    this.accessToken = access_token

    return access_token
  }

  async get(url: string) {
    const accessToken = await this.getAccessToken()

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    })

    return await response.json()
  }
}
