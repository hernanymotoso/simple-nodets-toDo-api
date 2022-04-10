import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const all = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json(todos);
  } catch (error) {
    res.json(error);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.json({ error: 'Set a title for create task' });
    }

    const todo = await Todo.create({ title });

    return res.status(200).json(todo);
  } catch (error) {
    return res.json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;

    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      return res.json({ error: 'Todo not found.' });
    }
    if (title) {
      todo.title = title;
    }

    if (done) {
      console.log('DONE', done.toLowerCase());
      switch (done.toLowerCase()) {
        case 'true':
        case '1':
          todo.done = true;
          break;
        case 'false':
        case '0':
          todo.done = false;
          break;
        default:
          todo.done = false;
          break;
      }
    }
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    return res.json(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.json({ error: 'Todo not found.' });
    }
    await todo.destroy();

    return res.status(200).json({ message: 'Todo deletado com sucesso' });
  } catch (error) {
    return res.json(error);
  }
};
