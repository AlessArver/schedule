"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.default = (app, io) => {
    const controller = new controllers_1.TodoController(io);
    app.get('/api/todos', auth_1.auth, controller.getTodos);
    app.get('/api/todos/:id', auth_1.auth, controller.getTodo);
    app.post('/api/todos/create', auth_1.auth, controller.createTodo);
    app.put('/api/todos/isCompleted/:id', auth_1.auth, controller.completeTodo);
    app.put('/api/todos/update-text/:id', auth_1.auth, controller.updateTodo);
    app.delete('/api/todos/delete/:id', auth_1.auth, controller.deleteTodo);
};
//# sourceMappingURL=todo.js.map