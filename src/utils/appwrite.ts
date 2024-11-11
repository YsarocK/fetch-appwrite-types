import { Client, Databases } from 'node-appwrite';
import { config } from 'dotenv';

config();

const client = new Client();

client.setEndpoint(process.env.APPWRITE_ENDPOINT);
client.setProject(process.env.APPWRITE_PROJECT_ID);
client.setKey(process.env.APPWRITE_API_KEY);

const databasesClient = new Databases(client);

export { databasesClient };