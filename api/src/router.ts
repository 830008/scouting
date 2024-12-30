import { authRouter } from "./auth/router.ts";
import { dataRouter } from "./data/router.ts";
import { eventsRouter } from "./events/router.ts";
import { router } from "./trpc.ts";
import { usersRouter } from "./users/router.ts";

export const appRouter = router({
  auth: authRouter,
  data: dataRouter,
  events: eventsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
