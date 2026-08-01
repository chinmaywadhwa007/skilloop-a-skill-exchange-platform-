import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { env } from '../config/env.js';

export default fp(async (app: FastifyInstance) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'SkillLoop API',
        description:
          'REST API for SkillLoop - a peer-to-peer skill exchange platform connecting Creators and Learners.',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${env.PORT}${env.API_PREFIX}` }],
      components: {
        securitySchemes: {
          cookieAuth: { type: 'apiKey', in: 'cookie', name: 'accessToken' },
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      tags: [
        { name: 'Auth', description: 'Authentication & session management' },
        { name: 'Users', description: 'User profile management' },
        { name: 'Skills', description: 'Skill CRUD & discovery' },
        { name: 'Categories', description: 'Skill categories' },
        { name: 'Requests', description: 'Learner-to-creator skill requests' },
        { name: 'Bookings', description: 'Session bookings' },
        { name: 'Reviews', description: 'Ratings & reviews' },
        { name: 'Notifications', description: 'User notifications' },
        { name: 'Chat', description: 'Private messaging' },
        { name: 'Dashboard', description: 'Role-based dashboards' },
        { name: 'Admin', description: 'Admin panel operations' },
        { name: 'Search', description: 'Global search' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
});
