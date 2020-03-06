import { https } from 'firebase-functions';
import setupGraphQLServer from './graphql/server'

// CF for Firebase with graphql-server-express
const graphQLServer = setupGraphQLServer()

// https
export const api = https.onRequest(graphQLServer)