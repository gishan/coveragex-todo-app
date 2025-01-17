import express, { Request, Response } from 'express';
import cors from 'cors';
import { createTask, fetchLatestTasks, markTaskAsDone } from './service';

const app = express();

app.use(cors())
app.use(express.json());

const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// fetch latest 5 tasks
app.get('/tasks', async (req: Request, res: Response) => {
    try {
       const tasks = await fetchLatestTasks();
       res.json({ tasks });
    } catch (error) {
        res.status(400).send({ error: (error as Error).message });
    }
});

// create a task
app.post('/tasks', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const createdTask = await createTask(title, description);
        res.json({ task: createdTask });
    } catch (error) {
        res.status(400).send({ error: (error as Error).message });
    }
});

// mark a task as done
app.patch('/tasks/:id/done', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedTask =  await markTaskAsDone(id as string);
        res.json({ task: updatedTask });
    } catch (error) {
        res.status(400).send({ error: (error as Error).message });
    }
});

export default app;