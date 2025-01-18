import { z } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

// Schema for creating a task
export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
        description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters')
    })
});

// Schema for marking a task as done
export const markTaskAsDoneSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid task ID format')
    })
});

type ValidationSchema = z.ZodObject<any>;

// Middleware factory for validating requests
export const validate = (schema: ValidationSchema): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    error: error.errors.map(err => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                });
            } else {
                res.status(400).json({ error: 'Invalid request' });
            }
        }
    };
};
