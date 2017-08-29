import {XHRBackend, Http, RequestOptions} from '@angular/http';
import {InterceptedHttp} from './interceptedHttp';
import { AuthService } from '../auth.service';

export function InterceptedHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, authService: AuthService): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, authService);
}