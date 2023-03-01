# Generate Typesript file from your Appwrite Databases 

## Install
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

## Usage

**A CLI is incoming**

```javascript
import { fetchNewTypes } from "fetch-appwrite-types";

await fetchNewTypes();
```

It creates a file appwrite.ts in a /types folder (creates it if doen't exist).