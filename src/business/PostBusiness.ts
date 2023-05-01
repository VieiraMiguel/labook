import { PostDatabase } from "../database/PostDatabase";
import { Post } from "../models/Posts";


export class PostBusiness {

    constructor(private postDatabse: PostDatabase) { }

    async getPost() {

        const postsDB = await this.postDatabse.getPosts()

        const posts = postsDB.map((postDB) => {
            return new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            )
        })

        const output = {
            posts,
        }

        return output
    }
}