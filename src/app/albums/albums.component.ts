import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from './albums.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent {

  public albums: any;
  public artist: any;

  constructor(
    public http: Http,
    public route: ActivatedRoute,
    public albumsService: AlbumsService,
    public router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.searchArtist(params.id);
        this.searchAlbums(params.id);
      }
    )
  }

  searchAlbums(id: string) {
    this.albumsService.searchAlbums(id)
      .map(response => response.json())
      .subscribe(response => {
        this.albums = response.items;
      })
  }

  searchArtist(id: string) {
    this.albumsService.searchArtist(id)
      .map(response => response.json())
      .subscribe(response => {
        this.artist = response;
      })
  }

  goToAlbum(id: string) {
    this.router.navigate(['get-album', id])
  }

}
