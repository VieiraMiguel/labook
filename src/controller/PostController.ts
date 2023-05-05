import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PostBusiness } from "../business/PostBusiness";
import { GetPostsInputDTO, GetPostsSchema } from "../dtos/posts/GetPosts.dto";
import { CreatePostInputDTO, CreatePostSchema } from "../dtos/posts/CreatePost.dto";
import { DeletePostSchema } from "../dtos/posts/DeletePost.dto";
import { EditPostSchema } from "../dtos/posts/EditPost.dto";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getAllPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostsSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPosts(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Erro inesperado");
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {

        try {

            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
          const input = EditPostSchema.parse({
            token: req.headers.authorization,
            content: req.body.content,
            idToEdit: req.params.id
          })
    
          const output = await this.postBusiness.editPost(input)
    
          res.status(200).send(output)
          
        } catch (error) {
          console.log(error)
    
          if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else {
            res.status(500).send("Erro inesperado")
          }
        }
      }
    
    //   public deletePost = async (req: Request, res: Response) => {
    //     try {
    //       const input = DeletePostSchema.parse({
    //         token: req.headers.authorization,
    //         idToDelete: req.params.id
    //       })
    
    //       const output = await this.postBusiness.deletePost(input)
    
    //       res.status(200).send(output)
          
    //     } catch (error) {
    //       console.log(error)
    
    //       if (error instanceof ZodError) {
    //         res.status(400).send(error.issues)
    //       } else if (error instanceof BaseError) {
    //         res.status(error.statusCode).send(error.message)
    //       } else {
    //         res.status(500).send("Erro inesperado")
    //       }
    //     }
    //   }
}