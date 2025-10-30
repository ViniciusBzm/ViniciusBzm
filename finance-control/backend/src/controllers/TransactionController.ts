import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../prisma/client';

export class TransactionController {
  // Create a new transaction
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, type, amount, category } = request.body as any;

      const transaction = await prisma.transaction.create({
        data: {
          title,
          type,
          amount,
          category
        }
      });

      return reply.status(201).send(transaction);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to create transaction' });
    }
  }

  // List all transactions (most recent first)
  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return reply.status(200).send(transactions);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch transactions' });
    }
  }

  // Get a single transaction by ID
  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return reply.status(400).send({ error: 'Invalid ID format' });
      }

      const transaction = await prisma.transaction.findUnique({
        where: { id: parsedId }
      });

      if (!transaction) {
        return reply.status(404).send({ error: 'Transaction not found' });
      }

      return reply.status(200).send(transaction);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch transaction' });
    }
  }

  // Update a transaction
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return reply.status(400).send({ error: 'Invalid ID format' });
      }

      // Check if transaction exists
      const existingTransaction = await prisma.transaction.findUnique({
        where: { id: parsedId }
      });

      if (!existingTransaction) {
        return reply.status(404).send({ error: 'Transaction not found' });
      }

      const transaction = await prisma.transaction.update({
        where: { id: parsedId },
        data: request.body as any
      });

      return reply.status(200).send(transaction);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to update transaction' });
    }
  }

  // Delete a transaction
  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return reply.status(400).send({ error: 'Invalid ID format' });
      }

      // Check if transaction exists
      const existingTransaction = await prisma.transaction.findUnique({
        where: { id: parsedId }
      });

      if (!existingTransaction) {
        return reply.status(404).send({ error: 'Transaction not found' });
      }

      await prisma.transaction.delete({
        where: { id: parsedId }
      });

      return reply.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to delete transaction' });
    }
  }
}
