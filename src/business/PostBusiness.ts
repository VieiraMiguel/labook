import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO } from "../dtos/posts/CreatePost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/posts/DeletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/posts/EditPost.dto";
import { GetPostsOutputDTO, GetPostsInputDTO } from "../dtos/posts/GetPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostBusiness {

    constructor(
        private postsDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {

        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const postsDB = await this.postsDatabase.getPosts()

        const posts = postsDB.map((postDB) => {
            const post = new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
            )

            return post.toBusinessModel()
        })

        const output: GetPostsOutputDTO = posts

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {

        const { content, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente");
        }

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new BadRequestError("Token inválido");
        }

        const id = this.idGenerator.generate();
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();
        const creatorId = payload.id;
        const creatorName = payload.name;

        const post = new Post(
            id,
            creatorId,
            content,
            0,
            0,
            createdAt,
            updatedAt,
        );

        const postDB = post.toDBModel();

        await this.postsDatabase.createPost(postDB);
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

        const { content, token, idToEdit } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {

            throw new UnauthorizedError()
        }

        const postDB = await this.postsDatabase.getPostById(idToEdit)

        if (!postDB) {

            throw new NotFoundError('')
        }

        if (payload.id !== postDB.creator_id) {

            throw new ForbiddenError('')
        }

        const post = new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
        )

        post.setContent(content)

        const editedPostDB = post.toDBModel()
        await this.postsDatabase.editPost(editedPostDB)

        const output: EditPostOutputDTO = undefined

        return output
    }

    public deletePost = async (
        input: DeletePostInputDTO
      ): Promise<DeletePostOutputDTO> => {
        const { token, idToDelete } = input
    
        const payload = this.tokenManager.getPayload(token)
    
        if (!payload) {
          throw new UnauthorizedError()
        }
    
        const postDB = await this.postsDatabase
          .getPostById(idToDelete)
    
        if (!postDB) {
          throw new NotFoundError("post com essa id não existe")
        }
    
        if (payload.role !== USER_ROLES.ADMIN) {
          if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("somente quem criou a post pode editá-la")
          }
        }
    
        await this.postsDatabase.deletePost(idToDelete)
    
        const output: DeletePostOutputDTO = undefined
    
        return output
      }
}