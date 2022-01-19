import shortid from 'shortid';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

const log:debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];

    constructor() {
        log('Created new instance of Users Data Access Object');
    }

    async addUser(user: CreateUserDto) {
        user.id = shortid.generate();
        this.users.push(user);
        return this.users;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId);
    }

    async putUserById(userId: string, user: PutUserDto) {
        let userIndex = this.users.findIndex((obj: {id: string}) => obj.id === userId);
        this.users.splice(userIndex, 1, user);
        return `${userId} updated with put`;
    }

    async patchByUserId(userId: string, user: PatchUserDto) {
        let userIndex = this.users.findIndex((obj: {id: string}) => obj.id === userId);
        let currentUser = this.users[userIndex];
        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel'
        ]

        for (let field of allowedPatchFields) {
            if (field in user) {
                currentUser[field] = user[field];
            }
        }
        this.users.splice(userIndex, 1, currentUser);
        return `${userId} patched`;
    }

    async removeUserById(userId: string) {
        let userIndex = this.users.findIndex((obj: {id: string}) => obj.id === userId);
        this.users.splice(userIndex, 1);
        return `${userId} removed`;
    }

    async getUserByEmail(email: string) {
        let userIndex = this.users.findIndex((obj: {email: string}) => obj.email === email);
        
        let currentUser = this.users[userIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default new UsersDao();