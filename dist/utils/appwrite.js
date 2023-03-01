import { Client, Databases } from 'node-appwrite';
import { config } from 'dotenv';
config();
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
const databasesClient = new Databases(client);
export { databasesClient };
