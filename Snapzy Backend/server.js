require("dotenv").config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


connectDB()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT} `);
})
