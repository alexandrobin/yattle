import Server from '@foundationjs/server'
import Persistence from '@foundationjs/persistence'
import models from './models'

const persistence = new Persistence()
const server = new Server()

persistence.init({
    // Setup our data models (empty for now)
    models:models,

    // Setup logging to go to the console.
    // If this is not provided, all logging will go into a .log file at the root
    log: {
        console: true,
    },

    // Setup the MongoDB endpoint
    endpoint: 'mongodb://127.0.0.1/yattle',
})

server.init({
    // This is the configuration object of Foundation Server
    persistence,
    // Setup the main endpoint on which our application will be served
    endpoint: {
        host: 'localhost',
        port: 8888,
    },

    graphql: {
        // Expose GraphQL on /graphql
        graphql: '/graphql',

        // Expose GraphiQL and enable it
        graphiql: '/graphiql',
        enableGraphiQL: true,
    },
    // Setup logging to go to the console.
    // If this is not provided, all logging will go into a .log file at the root
    log: {
        console: true,
    },
})