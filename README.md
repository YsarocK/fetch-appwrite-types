![fetch-appwrite-types banner](./readme-banner.jpg)

# Generate Typesript types from Appwrite Databases

![npm](https://img.shields.io/npm/dt/fetch-appwrite-types)
![npm](https://img.shields.io/npm/v/fetch-appwrite-types)
![tests](https://github.com/YsarocK/fetch-appwrite-types/actions/workflows/tests.yml/badge.svg)

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
| Name    | Default value            | Description                                       |
|---------|--------------------------|---------------------------------------------------|
| outDir  | ```"/types"``` | The folder where the type file will be generated  |
| outFileName   | `"appwrite"`  | The name of the generated type file               |
| includeDBName | ```false```              | Add the collection name at start of types         |
| hardTypes   | ```false```              | Creates an Email type and an URL types. [More](#hard-types). |

### Usage
#### CLI
Params can be passed as arguments in any order, except for the outDir which might be followed by the path.
```bash
npx fetch-appwrite-types includeDBName outDir /types outFileName appwrite hardTypes
```

#### Library
```javascript
await FetchNewTypes({
    outDir: "/types",
    outFileName: "appwrite",
    includeDBName: true,
    hardTypes: true
})
```

## Handled types

| Appwrite type | Generated type (simple) | Generated type (hard)      |
|---------------|-------------------------|----------------------------|
| String        | ```string```                  | ```string```               |
| Integer       | ```integer```                 | ```integer```              |
| Float         | ```integer```                 | ```integer```              |
| Boolean       | ```boolean```                 | ```boolean```              |
| DateTime      | ```string```                  | ```Date```                 |
| Email         | ```string```                  | [```Email```](#hard-types) |
| IP            | ```string```                  | ```string```               |
| URL           | ```string```                  | [```URL```](#hard-types)   |
| Enum          | ```Enum```                    | ```Enum```                 |
| Relationship  | Reference to Type       | Reference to Type          |

### Hard types
The hard types are types that are not native to typescript, but are often used in the context of a web application. They are generated as classes with methods to validate and parse the data.

| Name | Value |
|------|-------|
| Email | ```${string}@${string}.${string}``` |
| URL | ```${string}://${string}.${string}``` |
