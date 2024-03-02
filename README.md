![fetch-appwrite-types banner](./readme-banner.jpg)

# Generate Typesript types from Appwrite Databases

![npm](https://img.shields.io/npm/dt/fetch-appwrite-types)
![npm](https://img.shields.io/npm/v/fetch-appwrite-types)

## Quick usage
Make sure ton add the following values to your ```.env``` :
```APPWRITE_ENDPOINT```
```APPWRITE_PROJECT_ID```
```APPWRITE_API_KEY```

Then run the following command :

```bash
npx fetch-appwrite-types
```

## Installation
```bash
# yarn
yarn add fetch-appwrite-types

# npm
npm install fetch-appwrite-types
```

Make sure ton add the following values to your ```.env``` :
```APPWRITE_ENDPOINT```
```APPWRITE_PROJECT_ID```
```APPWRITE_API_KEY```

```javascript
import { FetchNewTypes } from "fetch-appwrite-types/dist/main";

await FetchNewTypes();
```

## Parameters
| Name    | Default value            | Description                                |
|---------|--------------------------|--------------------------------------------|
| outDir  | ```"/types"``` | The folder where the type file will be generated |
| includeDBName | ```false```              | Add the collection name at start of types  |
| hardTypes   | ```false```              | Creates an Email type and an URL types     |

### Usage
#### CLI
Params can be passed as arguments in any order, except for the outDir which might be followed by the path.
```bash
npx fetch-appwrite-types includeDBName outDir /types hardTypes
```

#### Library
```javascript
await FetchNewTypes({
    outDir: "/types",
    includeDBName: true,
    hardTypes: true
})
```

## Handled types

| Appwrite type | Generated type (simple) | Generated type (hard) |
|---------------|-------------------------|-----------------------|
| String        | ```string```                  | ```string```                |
| Integer       | ```integer```                 | ```integer```               |
| Float         | ```integer```                 | ```integer```               |
| Boolean       | ```boolean```                 | ```boolean```               |
| DateTime      | ```string```                  | ```Date```                  |
| Email         | ```string```                  | ```Email```                 |
| IP            | ```string```                  | ```string```                |
| URL           | ```string```                  | ```string```                |
| Enum          | ```Enum```                    | ```Enum```                  |
| Relationship  | Reference to Type       | Reference to Type     |
