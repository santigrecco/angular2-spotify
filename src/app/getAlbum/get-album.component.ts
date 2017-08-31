import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAlbumService } from './get-album.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'get-album',
  templateUrl: './get-album.component.html',
  styleUrls: ['./get-album.component.less']
})
export class GetAlbumComponent {
  public params: any;
  public album: any;
  public tracks: any;
  public favs: Array<any> = [];


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
        this.getAlbumTracks(params.id);
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
          this.album = response
        });
  }

  getAlbumTracks(id: string) {
    this.getAlbumService.getAlbumTracks(id)
      .subscribe(
        (response: any) => {
          this.tracks = response.items
          this.tracks.forEach((el: any) => console.log(el.preview_url))
        });
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
      this.favs.push(track);
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
}
