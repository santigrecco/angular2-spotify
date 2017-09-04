import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  public searchText = '';
  public searchOpen = false;


  get showInput() {
    let url = this.location.path()

    return url.includes("/albums") || url.includes("/get-album");

  }

  constructor(
    public location: Location,
    public router: Router
  ) {}

  searchArtist() {
    this.router.navigate(['artists', this.searchText])
  }  

  toggleSearch(searchbarHeader: any) {
    this.searchOpen = !this.searchOpen;
    searchbarHeader.focus(); 
  }

  closeSearchBar() {
    this.searchOpen = false;
  }
}
