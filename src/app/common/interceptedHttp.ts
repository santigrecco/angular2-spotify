import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

import { AuthService } from '../auth.service';

@Injectable()
export class InterceptedHttp extends Http {

    public baseUrl = 'https://api.spotify.com/v1';

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        public authService: AuthService
    ) {
        super(backend, defaultOptions);
    }

    request(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
        .catch((err: Response) => {
            if (err.status === 401 || err.status === 403) {
                this.authService.login();
            }                
            return Observable.throw(err);
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.updateUrl(url), this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.updateUrl(url), body, this.getRequestOptionArgs(options));
    }

    private updateUrl(request: any):string {
        return this.baseUrl + request;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', 'Bearer ' + this.authService.getToken());

        return options;
    }
}