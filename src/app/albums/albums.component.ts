import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from './albums.service';

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less', './albums.component.medium.less']
})
export class AlbumsComponent {

  public albums: any;
  public artist: any;
  public gotAlbums: Boolean = false;
  public gotArtist: Boolean = false;
  get isLoading():Boolean {
    return !this.gotAlbums || !this.gotArtist;
  }

  constructor(
    public http: Http,
    public route: ActivatedRoute,
    public albumsService: AlbumsService,
    public router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.getArtist(params.id);
        this.searchAlbums(params.id);
      }
    )
  }

  searchAlbums(id: string) {
    this.albumsService.searchAlbums(id)
      .map(response => response.json())
      .subscribe(response => {
        this.albums = response.items;
        this.gotAlbums = true;
      })
  }

  getArtist(id: string) {
    this.albumsService.searchArtist(id)
      .map(response => response.json())
      .subscribe(response => {
        this.artist = response;
        this.gotArtist;
      })
  }

  goToAlbum(id: string) {
    this.router.navigate(['get-album', id])
  }

}
