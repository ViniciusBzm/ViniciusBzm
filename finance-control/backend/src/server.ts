import Fastify from 'fastify';
import cors from '@fastify/cors';
import { transactionRoutes } from './routes/transactions';

// Create Fastify instance
const fastify = Fastify({
  logger: true
});

// Register CORS to allow frontend access
fastify.register(cors, {
  origin: '*', // In production, specify the exact frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Register routes
fastify.register(transactionRoutes);

// Health check endpoint
fastify.get('/', async (request, reply) => {
  return { status: 'ok', message: 'Finance Control API is running' };
});

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server is running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
