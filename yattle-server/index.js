import Server from '@dazzled/framework-server'
// soon: import Server from '@foundationjs/server'

const server = new Server()

server.init({
    // This is the configuration object of Foundation Server

    // Setup the main endpoint on which our application will be served
    endpoint: {
        host: 'localhost',
        port: 8888,
    },


    // Setup logging to go to the console.
    // If this is not provided, all logging will go into a .log file at the root
    log: {
        console: true,
    },
})