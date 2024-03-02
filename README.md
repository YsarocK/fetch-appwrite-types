# Generate Typesript file from your Appwrite Databases

![npm](https://img.shields.io/npm/dt/fetch-appwrite-types)
![npm](https://img.shields.io/npm/v/fetch-appwrite-types)

## Quick usage
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

### Config
Make sure ton add the following values to your ```.env``` :
```APPWRITE_ENDPOINT```
```APPWRITE_PROJECT_ID```
```APPWRITE_API_KEY```

### Usage
```javascript
import { fetchNewTypes } from "fetch-appwrite-types/dist/main";

await fetchNewTypes();
```

It creates a file appwrite.ts in a /types folder (creates it if doen't exist).

## Handled types

| Appwrite type | Generated type (simple) | Generated type (hard) |
|---------------|-------------------------|-----------------------|
| String        | string                  | string                |
| Integer       | integer                 | integer               |
| Float         | integer                 | integer               |
| Boolean       | boolean                 | boolean               |
| DateTime      | Date                    | Date                  |
| Email         | string                  | Email                 |
| IP            | string                  | string                |
| URL           | string                  | string                |
| Enum          | Enum                    | Enum                  |
