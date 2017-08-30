
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';


@Injectable()
export class GetAlbumService {

    constructor(public http: Http) {}

    getAlbum(id: string) {
        let fullUrl = `/albums/${id}`;  
        return this.http.get(fullUrl)
        .map(response => response.json());
    }

    getAlbumTracks(id: string) {
        let fullUrl = `/albums/${id}/tracks`;  
        return this.http.get(fullUrl)
            .map(response => response.json());
    }

}