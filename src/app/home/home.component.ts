import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Http } from '@angular/http';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public favourites: any;


  get areFavourites(): boolean {
    
    return !!this.favourites;
  }

  public searchText: string = '';

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    if(localStorage.getItem('favs'))
      this.favourites = JSON.parse(localStorage.getItem('favs'));
  }

  searchArtist() {
    this.router.navigate(['artists', this.searchText])
  }

  goToAlbum(fav: any) {
    this.router.navigate(['get-album', fav.albumId])
  }

  removeFav(event: any, index:number) {
    event.stopPropagation();
    this.favourites.splice(index, 1);
    localStorage.setItem('favs', JSON.stringify(this.favourites));
  }
}
