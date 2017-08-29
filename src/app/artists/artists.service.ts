
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';


@Injectable()
export class ArtistsService {
    public searchArtistUrl: string = '/search';

    constructor(public http: Http) {}

    searchArtist(artist: string) {
        let requestOptions = new RequestOptions();

        let params: URLSearchParams = new URLSearchParams();
        params.set('query', artist);
        params.set('type', 'artist');
        requestOptions.search = params;

        return this.http.get(this.searchArtistUrl, requestOptions);
    }

}