import { FastifyInstance } from 'fastify';
import { TransactionController } from '../controllers/TransactionController';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transactionSchema';

// Transaction routes
export async function transactionRoutes(fastify: FastifyInstance) {
  const controller = new TransactionController();

  // POST /transactions - Create a new transaction
  fastify.post('/transactions', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'type', 'amount', 'category'],
        properties: {
          title: { type: 'string' },
          type: { type: 'string', enum: ['income', 'expense'] },
          amount: { type: 'number' },
          category: { type: 'string' }
        }
      }
    },
    preValidation: async (request, reply) => {
      try {
        createTransactionSchema.parse(request.body);
      } catch (error: any) {
        return reply.status(400).send({ error: error.errors });
      }
    },
    handler: async (request, reply) => {
      return controller.create(request, reply);
    }
  });

  // GET /transactions - List all transactions
  fastify.get('/transactions', async (request, reply) => {
    return controller.list(request, reply);
  });

  // GET /transactions/:id - Get a specific transaction
  fastify.get('/transactions/:id', async (request, reply) => {
    return controller.getById(request, reply);
  });

  // PUT /transactions/:id - Update a transaction
  fastify.put('/transactions/:id', {
    preValidation: async (request, reply) => {
      try {
        updateTransactionSchema.parse(request.body);
      } catch (error: any) {
        return reply.status(400).send({ error: error.errors });
      }
    },
    handler: async (request, reply) => {
      return controller.update(request, reply);
    }
  });

  // DELETE /transactions/:id - Delete a transaction
  fastify.delete('/transactions/:id', async (request, reply) => {
    return controller.delete(request, reply);
  });
}
