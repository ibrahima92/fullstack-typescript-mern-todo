"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let todos = [];
exports.getTodos = (req, res) => {
    res.status(200).json({ todos });
};
exports.addTodos = (req, res) => {
    const body = req.body;
    const todo = {
        _id: new Date().toISOString(),
        name: body.name,
        description: body.description,
        status: body.status,
    };
    todos.push(todo);
    res.status(201).json({ message: 'Todo added successfully', todo, todos });
};
exports.updateTodos = (req, res) => {
    const body = req.body;
    const todo = {
        _id: new Date().toISOString(),
        name: body.name,
        description: body.description,
        status: body.status,
    };
    todos.push(todo);
    res.status(201).json({ message: 'Todo added successfully', todo, todos });
};
exports.deleteTodos = (req, res) => {
    const { _id } = req.params;
    todos = todos.filter((todo) => todo._id !== _id);
    res.status(200).json({ message: 'Deleted todo', todos });
};
