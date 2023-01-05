import { Router } from "express";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.use(postsRouter);
router.use(authRouter);
router.use(usersRouter)

export default router;
