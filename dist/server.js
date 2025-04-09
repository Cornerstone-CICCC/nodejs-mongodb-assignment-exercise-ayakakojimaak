"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const product_routes_1 = __importDefault(require("./routes/product.routes"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use("/", product_routes_1.default);
app.use((req, res) => {
    res.status(404).send("404");
});
// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;
if (!process.env.DATABASE_URL) {
    throw Error("DATABASE_URL is not defined in .env file");
}
mongoose_1.default
    .connect(process.env.DATABASE_URL, { dbName: "store" })
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
})
    .catch((err) => console.error("Failed to connect to MongoDB", err));
