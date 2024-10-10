import {$api} from "../../../http";

export default class AuthService {
    static async registration(email: string, username: string, password: string ){
        return $api.post("/auth/registration", {email, username, password})
    }

    static async login(email: string, password: string ){
        return $api.post("/auth/login", {email, password})
    }

    static async verify() {
        return $api.post("/auth/verify");
    }

    static async logout() {
        return $api.post("/auth/logout");
    }

    static async test(){
        return $api.post("/auth/test", {})
    }
}