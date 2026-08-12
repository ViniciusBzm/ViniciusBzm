import { z } from 'zod';

// Schema for creating a new transaction
export const createTransactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Type must be either "income" or "expense"' })
  }),
  amount: z.number().positive('Amount must be a positive number'),
  category: z.string().min(1, 'Category is required')
});

// Schema for updating a transaction (all fields optional)
export const updateTransactionSchema = z.object({
  title: z.string().min(1).optional(),
  type: z.enum(['income', 'expense']).optional(),
  amount: z.number().positive().optional(),
  category: z.string().min(1).optional()
});

// Type inference for TypeScript
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
