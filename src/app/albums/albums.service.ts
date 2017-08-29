
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';


@Injectable()
export class AlbumsService {

    constructor(public http: Http) {}

    searchArtist(id: string) {
        let fullUrl = `/artists/${id}`;  
        return this.http.get(fullUrl);
    }

    searchAlbums(id: string) {
        let fullUrl = `/artists/${id}/albums`;  
        return this.http.get(fullUrl);
    }

}