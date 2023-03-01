# Generate Typesript file from your Appwrite Databases 

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