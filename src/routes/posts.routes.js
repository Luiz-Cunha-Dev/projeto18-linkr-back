import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/timeline.Controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { postsSchema } from "../models/schemas.js";

const postsRouter = Router();

postsRouter.get("/timeline", getPosts);
postsRouter.post("/timeline", schemaValidation(postsSchema), createPost);
postsRouter.patch("/timeline"), updatePost;
postsRouter.delete("/timeline"), deletePost;

export default postsRouter;
