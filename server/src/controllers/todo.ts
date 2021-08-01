import { Request, Response } from 'express'
import socket from 'socket.io'

import { TodoModel } from '../models'
import { TodoDocument } from '../models/Todo'

class TodoController {
  io: socket.Server

  constructor(io: socket.Server) {
    this.io = io
  }

  getTodos = async (req: any, res: Response) => {
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

      TodoModel.find({
        owner: req.user.userId
        //createdAt: {'$gte': today, $lt: today1}
      }, (e: any, todos: Array<TodoDocument>) => {
        e ? res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
          : res.json({resultCode: 0, todos, message: 'Тодошки получены'})
      })
    } catch (e) {
      res.json({resultCode: 1, message: `Error: ${e}`})
    }
  }
  getTodo = (req: any, res: Response) => {
    TodoModel.findById(req.params.id, (e: any, todo: any) => {
        e ? res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
          : res.json({resultCode: 0, todo, message: 'Тодо получено'})
      }
    )
  }
  createTodo = async (req: any, res: Response) => {
    try {
      const todo = await new TodoModel({
        owner: req.user.userId,
        text: req.body.text
      }).save()
      res.json({resultCode: 0, id: todo._id, message: 'Тодо создано'})
      this.io.emit('add_todo', todo)
    } catch (e) {
      res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
    }
  }
  completeTodo = (req: any, res: Response) => {
    TodoModel.findByIdAndUpdate(
      req.params.id,
      {isCompleted: req.body.isCompleted},
      (e: any, todo: TodoDocument) => {
        if (e)
          res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
        else {
          res.json({resultCode: 0, message: 'Тодо завершено'})
        }
      }
    )
  }
  updateTodo = async (req: any, res: Response) => {
    TodoModel.findByIdAndUpdate(
      req.params.id,
      {text: req.body.text},
      (e: any, todo: TodoDocument) => {
        if (e)
          res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
        else {
          res.json({resultCode: 0, message: 'Тодо обновлено'})
          this.io.emit('update_todo_text', todo)
        }
      }
    )
  }
  deleteTodo = (req: any, res: Response) => {
    try {
      // TodoModel.findByIdAndDelete(req.params.id, (e: any, todo: TodoDocument) => {
      //   if (e)
      //     res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
      //   else {
      //     res.json({resultCode: 0, message: 'Тодо удалено'})
      //   }
      // })
    } catch (e) {
      res.json({resultCode: 1, message: 'Что-то пошло не так. Попробуйте снова.', e: e})
    }
  }
}

export default TodoController