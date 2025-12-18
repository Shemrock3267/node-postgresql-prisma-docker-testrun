import express from 'express'
import prisma from "../prismaClient.js";

const router = express.Router();

// get all todos for the user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos);
})

// create task item
router.post('/', async (req, res) => {
    const { task } = req.body

    if (!task) { return res.status(400).json({ message: "No task provided" }) }

    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId,
        }
    })


    res.json(todo)
})

// update task
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { completed } = req.body;

    if (!id) {
        return res.status(400).json({ message: "No id provided" })
    }
    if (completed < 0 || completed > 1) {
        return res.status(400).json({ message: "Wrong status provided" })
    }

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.json(updatedTodo)
})

// delete task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.userId

    if (!id) {
        return res.status(400).json({ message: "No id provided" })
    }

    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId,
        }
    })

    res.send({ message: "Todo deleted" })
})

export default router
