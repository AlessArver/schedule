"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const socket_1 = __importDefault(require("./core/socket"));
const app = express_1.default();
const server = http_1.createServer(app);
const io = socket_1.default(server);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
//if (process.env.NODE_ENV === 'production') {
//app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')))
// app.get('*', (req: express.Request, res: express.Response) => {
//   //res.send('Hiiii')
//   res.sendFile(path.join(__dirname + '../../../client/build/index.html'))
// })
//}
app.use('/api/user', routes_1.UserRouters);
//app.use('/api/todos', auth, () => todoRouters(app, io))
routes_1.TodoRouters(app, io);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=main.js.map