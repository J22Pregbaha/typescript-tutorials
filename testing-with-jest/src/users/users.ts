import axios from 'axios';

export default class Users {
    static async all() {
        let res = await axios.get('http://localhost:3000/users');
        return res;
    }
}