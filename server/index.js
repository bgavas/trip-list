// Set environment keys
const Config = require('./config/Config');
const config = new Config();
config.setEnvKeys();

const App = require('./App');

// Start express app
const app = new App();
app.connectToDatabase();
// app.initializeMiddleware();
// app.startServer();

module.exports = { app };