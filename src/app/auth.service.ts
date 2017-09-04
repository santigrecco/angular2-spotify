import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    public token: any;
    public tokenExpireDate: Date;

    private loginUrl = "https://accounts.spotify.com/authorize?scope=user-library-read%20user-library-modify&client_id=c71248ed55874ab494767403c98201db&response_type=token&redirect_uri=http://localhost:8080/set-token";
    
    constructor() {
        this.token = localStorage.getItem('token');
        this.tokenExpireDate = new Date(localStorage.getItem('token_expire_date'));
    }

    getToken() {
        return this.token;
    }

    setToken(token: any, expiresIn: any) {
        let actualDate = new Date();
        let expireDate = new Date (actualDate.getTime() + (parseInt(expiresIn) * 1000));

        localStorage.setItem('token_expire_date', expireDate.toString());
        localStorage.setItem('token', token);
        this.token = token;
    }

    authenticated() {
        let actualDate = new Date();

        return !!this.token && !!this.tokenExpireDate && this.isTokenValid(actualDate, this.tokenExpireDate);
    }

    isTokenValid(actualDate: Date, expireDate: Date) {
        return actualDate.getTime() < expireDate.getTime();
    }

    login() {
        window.location.href = this.loginUrl;
    }
}