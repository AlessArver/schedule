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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class TodoController {
    constructor(io) {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // let today: Date | string = new Date(req.query.currentPage)
                // let dd = String(today.getDate()).padStart(2, '0')
                // let mm = String(today.getMonth() + 1).padStart(2, '0')
                // let yyyy = today.getFullYear()
                // today = yyyy + '-' + mm + '-' + dd
                //
                // let today1: Date | string = new Date(req.query.currentPage)
                // let dd1 = String(today1.getDate() + 1).padStart(2, '0')
                // today1 = yyyy + '-' + mm + '-' + dd1
                models_1.TodoModel.find({
                    owner: req.user.userId
                    //createdAt: {'$gte': today, $lt: today1}
                }, (e, todos) => {
                    e ? res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e })
                        : res.json({ resultCode: 0, todos, message: 'Тодошки получены' });
                });
            }
            catch (e) {
                res.json({ resultCode: 1, message: `Error: ${e}` });
            }
        });
        this.getTodo = (req, res) => {
            models_1.TodoModel.findById(req.params.id, (e, todo) => {
                e ? res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e })
                    : res.json({ resultCode: 0, todo, message: 'Тодо получено' });
            });
        };
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield new models_1.TodoModel({
                    owner: req.user.userId,
                    text: req.body.text
                }).save();
                res.json({ resultCode: 0, id: todo._id, message: 'Тодо создано' });
                this.io.emit('add_todo', todo);
            }
            catch (e) {
                res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
            }
        });
        this.completeTodo = (req, res) => {
            models_1.TodoModel.findByIdAndUpdate(req.params.id, { isCompleted: req.body.isCompleted }, (e, todo) => {
                if (e)
                    res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
                else {
                    res.json({ resultCode: 0, message: 'Тодо завершено' });
                }
            });
        };
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            models_1.TodoModel.findByIdAndUpdate(req.params.id, { text: req.body.text }, (e, todo) => {
                if (e)
                    res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
                else {
                    res.json({ resultCode: 0, message: 'Тодо обновлено' });
                    this.io.emit('update_todo_text', todo);
                }
            });
        });
        this.deleteTodo = (req, res) => {
            try {
                // TodoModel.findByIdAndDelete(req.params.id, (e: any, todo: TodoDocument) => {
                //   if (e)
                //     res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
                //   else {
                //     res.json({resultCode: 0, message: 'Тодо удалено'})
                //   }
                // })
            }
            catch (e) {
                res.json({ resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e });
            }
        };
        this.io = io;
    }
}
exports.default = TodoController;
//# sourceMappingURL=todo.js.map