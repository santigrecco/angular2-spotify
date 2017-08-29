import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    public token: any;
    
    private loginUrl = "https://accounts.spotify.com/authorize?scope=user-library-read%20user-library-modify&client_id=c71248ed55874ab494767403c98201db&response_type=token&redirect_uri=http://localhost:8080/set-token";
    
    constructor() {
        this.token = localStorage.getItem('token');
    }

    getToken() {
        return this.token;
    }

    setToken(token: any) {
        localStorage.setItem('token', token)
        this.token = token;
    }

    authenticated() {
        return !!this.token;
    }


    login() {
        window.location.href = this.loginUrl;
    }
}