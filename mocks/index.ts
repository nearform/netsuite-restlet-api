import { Config } from "../src/types"

export const MOCK_CONFIG: Config = {
  certificateId: 'some-certificate-id',
  clientId: 'some-client-id',
  tokenUrl: 'https://token.com/some-endpoint',
  privateKey: 'some-private-key'
}

export const MOCK_TOKEN_API_RESPONSE = {
  access_token: 'some-access-token',
  expires_in: 3600
}

export const MOCK_NETSUITE_API_RESPONSE = [
  {
    employeeName: 'Tony Stark',
    email: 'tony.stark@example.com'
  },
  {
    employeeName: 'Steve Rogers',
    email: 'steve.rogers@example.com'
  },
  {
    employeeName: 'Bruce Banner',
    email: 'bruce.banner@example.com'
  },
  {
    employeeName: 'Thor Odinson',
    email: 'thor.odinson@example.com'
  },
  {
    employeeName: 'Natasha Romanoff',
    email: 'natasha.romanoff@example.com'
  },
  {
    employeeName: 'Clint Barton',
    email: 'client.barton@example.com'
  }
]
