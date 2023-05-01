import { UserDatabase } from "../database/UserDatabase";
import { SignupDTO } from "../dtos/Signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Users } from "../models/Users";


export class UserBusiness {

    constructor(private userDatabase: UserDatabase){}

    async signup(input: SignupDTO) {

        const {name, email, password} = input

        const userDB = await this.userDatabase.findUser(email)

        if (userDB) {

            throw new BadRequestError('email already used')
        }

        const newUser = new Users(
            email,
            name,
            email,
            password,
            'role',
            `${new Date()}`
        )
    }
}