![CI](https://github.com/nearform/netsuite-restlet-api/actions/workflows/ci.yml/badge.svg?event=push)

# NetSuite RESTlet API

A JavaScript API client library for NetSuite RESTlets.

## Installation

```bash
npm i netsuite-restlet-api
```

## Usage

The package is available to be consumed via both CommonJS and ESM modules. It exposes a single class named NetSuiteClient where a configuration has to be passed. Then you can invoke get method on the resulting object to fetch data from NetSuite restlet.

```js
import { NetSuiteClient } from 'netsuite-restlet-api'

const client = new NetSuiteClient({
  certificateId: 'your-certificate-id',
  clientId: 'your-client-id',
  tokenUrl: 'https://your-token-url',
  privateKey: 'your-private-key'
})

const data = await client.get('https://your-restlet-url')
```

[![banner](https://raw.githubusercontent.com/nearform/.github/refs/heads/master/assets/os-banner-green.svg)](https://www.nearform.com/contact/?utm_source=open-source&utm_medium=banner&utm_campaign=os-project-pages)
