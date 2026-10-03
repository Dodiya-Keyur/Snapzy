require("dotenv").config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        await connectDB();

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

startServer();
