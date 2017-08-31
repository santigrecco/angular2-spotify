import { Injectable } from '@angular/core';


@Injectable() 
export class PreviewService {
    public playingTrack =  new Audio();
    public currentlyPlayingTrack: any;

    play(track: any) {
        if(this.currentlyPlayingTrack && this.currentlyPlayingTrack.id === track.id && this.playingTrack.paused) {
            this.playingTrack.play();
        } else {
            this.pause();
            this.playingTrack.currentTime = 0;
            this.currentlyPlayingTrack = track;
            this.playingTrack.src = track.preview_url;
            this.playingTrack.load();
            this.playingTrack.play();
        }
    }

    pause() {
        this.playingTrack.pause();
    }

    isSettedTrack(track: any) {
        return this.currentlyPlayingTrack && this.currentlyPlayingTrack.id === track.id;
    }

    isPlaying(track: any) {
        return !this.playingTrack.paused; 
    }

    

}