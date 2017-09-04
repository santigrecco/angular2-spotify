import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from "./artists.service";
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.less']
})
export class ArtistsComponent {

  public artists: Array<any>;
  public searched: string;
  public searchText: string = '';
  public isLoading: Boolean = true;


  constructor(
    public route: ActivatedRoute,
    public artistsService: ArtistsService,
    public router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.searched = params.search;      
        this.search(params.search)
      }
    )
  }

  search(search: string) {
    this.artistsService.searchArtist(search)
      .map(response => response.json())
      .subscribe(
        response => {
          this.artists = response.artists.items;
          this.isLoading = false;
        }
      )
  }

  goToAlbums(id: string) {
    this.router.navigate(['albums', id])
  }
  
  searchArtist() {
    this.router.navigate(['artists', this.searchText])
  }

}
