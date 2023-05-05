import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getAllPosts)

postRouter.post("/posts", postController.createPost)