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

  get areFavourites(): boolean {
    return false;
  }

  public searchText: string = '';

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  searchArtist() {
    this.router.navigate(['artists', this.searchText])
  }
}
