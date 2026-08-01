import Fastify from "fastify";
import { env } from "./config/env.js";
import { loggerConfig } from "./config/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";
import securityPlugin from "./plugins/security.plugin.js";
import swaggerPlugin from "./plugins/swagger.plugin.js";
import { sendSuccess } from "./common/utils/ApiResponse.js";
// Module routes
import authRoutes from "./modules/auth/routes/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: loggerConfig,
    trustProxy: true,
  });

  // Global plugins
  await app.register(securityPlugin);
  await app.register(swaggerPlugin);

  // Global error handler (Zod, Prisma, ApiError, fallback)
  app.setErrorHandler(errorHandler);

  // Health check (no versioning / auth)
  app.get("/health", async (_req, reply) =>
    sendSuccess(reply, {
      message: "SkillLoop API is running",
      data: { status: "ok" },
    }),
  );

  // Versioned API routes
  await app.register(
    async (api) => {
      await api.register(authRoutes, { prefix: "/auth" });
      await api.register(usersRoutes, { prefix: "/users" });

      // Modules to be added in the next phases:
      // await api.register(skillsRoutes, { prefix: '/skills' });
      // await api.register(categoriesRoutes, { prefix: '/categories' });
      // await api.register(requestsRoutes, { prefix: '/requests' });
      // await api.register(bookingsRoutes, { prefix: '/bookings' });
      // await api.register(reviewsRoutes, { prefix: '/reviews' });
      // await api.register(notificationsRoutes, { prefix: '/notifications' });
      // await api.register(chatRoutes, { prefix: '/chat' });
      // await api.register(dashboardRoutes, { prefix: '/dashboard' });
      // await api.register(adminRoutes, { prefix: '/admin' });
      // await api.register(searchRoutes, { prefix: '/search' });
    },
    { prefix: env.API_PREFIX },
  );

  // 404 handler in standard API format
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      message: `Route ${request.method} ${request.url} not found`,
      errors: ["Not Found"],
    });
  });

  return app;
}
