import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from "../prismaClient.js";


const router = express.Router();
const SALT = 13;

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, SALT);

    // save a user and password to DB
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        })

        // add default task after the user creation
        const defaultTodo = 'Hey, add your first task :)';
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id,
            }
        })

        // create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            return res.status(404).send({message: 'User not found!'});
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({message: 'Invalid password!'});
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
})


export default router;
