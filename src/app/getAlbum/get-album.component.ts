import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAlbumService } from './get-album.service';


@Component({
  selector: 'get-album',
  templateUrl: './get-album.component.html',
  styleUrls: ['./get-album.component.less', './get-album.component.medium.less' ]
})
export class GetAlbumComponent {
  public params: any;
  public album: any;
  public tracks: any;
  public favs: Array<any> = [];
  public sortStates: Array<string> = ['track_number', 'duration_ms']
  public sortBy: string = 'track_number';
  public isLoading: Boolean = true; 

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public getAlbumService: GetAlbumService,
    @Inject('PreviewService') public previewService: any
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.params = params;
        this.getAlbum(params.id);
        // this.getAlbumTracks(params.id);
      }
    )
    let storagedFavs = localStorage.getItem('favs');
    if(storagedFavs) {
      this.favs = JSON.parse(storagedFavs);
    }
  }


  getAlbum(id: string) {
    this.getAlbumService.getAlbum(id)
      .subscribe(
        (response: any) => {
          this.album = response;
          this.tracks = response.tracks.items;
          this.album.release_date = response.release_date ? new Date(response.release_date) : null;
        },  
        ()=>{},
        ()=>{
          this.isLoading = false;
        }
      );
  }

  get disks(): Array<any> {
    if(!this.tracks)
        return [];
    let { length } = this.tracks;
    let disksNumber = this.tracks[length - 1].disc_number;
    return new Array(disksNumber);
  }

  tracksOfDisk(number: number) {
    if(!this.tracks)
      return []
    return this.tracks.filter((el: any) => el.disc_number === number);
  }


  getFavIndex(id: string) {
    return this.favs.map(el => el.id).indexOf(id);    
  }

  isFav(id: string) {
    return this.getFavIndex(id) > -1;
  }

  favourite(track: any) {
    let index = this.getFavIndex(track.id);
    if(index != -1) {
      this.favs.splice(index, 1);
    } else {
      let makeObj = {
        id: track.id,
        artists: track.artists,
        name: track.name,
        albumId: this.album.id,
        albumImage: this.album.images
      }
      this.favs.push(makeObj);
    }

    localStorage.setItem('favs', JSON.stringify(this.favs));
  }


  havePreview(track: any) {
    return !!track.preview_url;
  }

  playPause(track: any) {
    if(!this.havePreview(track))
        return

    if(this.previewService.isSettedTrack(track)) {
      this.previewService.isPlaying() ? this.previewService.pause(track) : 
      this.previewService.play(track);
    } else {
      this.previewService.play(track);
    }
  }

  isPlaying(track: any) {
    return this.previewService.isSettedTrack(track) && this.previewService.isPlaying();
  }


  toggleSortBy() {
    switch (this.sortBy) {
      case this.sortStates[0]: {
        this.sortBy = this.sortStates[1];
        break;
      }

      case this.sortStates[1]: {
        this.sortBy = this.sortStates[0];
        break;
      }
    }
  }

  get sortTrackNumberIsActive() {
    return this.sortStates[0] === this.sortBy;
  }

  get sortDurationIsActive() {
    return this.sortStates[1] === this.sortBy;
  }
  
  get sortOrder() {
    return this.sortTrackNumberIsActive ? 'smaller' : 'bigger'
  }

}
