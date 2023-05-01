import { PostDB } from "../models/Posts";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POSTS = 'posts'

    public async getPosts() {

        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)

        return postsDB
    }

    public async getPostById(id: string) {

        const [postDB] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }

    public async createPost(newPost: PostDB): Promise<void> {

        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPost)
    }

    public async editPost(newPost: PostDB): Promise<void> {

        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(newPost)
            .where({ id: newPost.id })
    }

    public async deletePost(id: string): Promise<void> {

        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }
}