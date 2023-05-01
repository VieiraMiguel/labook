import { UserDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_USERS = 'users'

    public async createUser(newUser: UserDB): Promise<void> {

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUser)
    }

    public async findUser(email: string) {

        const [userDB] =
            await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ email })

        return userDB
    }
}