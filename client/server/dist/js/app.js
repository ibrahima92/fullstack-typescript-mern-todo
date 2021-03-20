"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Priority serve any static files.
console.log("__dirname", __dirname);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../../build")));
app.use(routes_1.default);
// __dirname / Users / katarzynawegorek / kwegorek / fullstack -
//   typescript -
//   mern -
//   todo / client / server / dist / js;
// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
    response.sendFile(path_1.default.resolve(__dirname, "../../../build", "index.html"));
});
const uri = "mongodb://127.0.0.1:27017/mydatabase";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
