import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth.service';
import { AppResolver } from './app.resolver';

import { CapitalizePipe } from './pipes/capitalize';

import { Http, ConnectionBackend } from '@angular/http';
import { InterceptedHttp } from './common/interceptedHttp';
import { InterceptedHttpFactory } from './common/interceptedHttpFactory';
import { SortPipe } from './common/sortPipe';
import { AppGuard } from './app.guard';

//services

import { ArtistsService } from './artists/artists.service';
import { AlbumsService } from './albums/albums.service';
import { GetAlbumService } from './getAlbum/get-album.service';
import { PreviewService } from './common/preview.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
    HeaderComponent,
    SortPipe
  ],
  providers: [
    AuthService,
    ArtistsService,
    AlbumsService,
    GetAlbumService,
    AppResolver,
    {
      provide: Http,
      useFactory: InterceptedHttpFactory,
      deps: [XHRBackend, RequestOptions, AuthService]
    },
    {
      provide: 'PreviewService',
      useClass: PreviewService
    },
    AppGuard
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
