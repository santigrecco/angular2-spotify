import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { GetAlbumComponent } from './getAlbum/get-album.component';
import { AppResolver } from './app.resolver';
import { SetTokenComponent } from "./setToken/set-token.component";
import { AppGuard } from './app.guard';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/home' 
  },
  {
    path: 'set-token',
    component: SetTokenComponent
  },
  { 
    path: 'home', 
    component: HomeComponent,
    resolve:  {
      appResolver: AppResolver
    },
    canActivate: [AppGuard]
  },
  { 
    path: 'albums/:id', 
    component: AlbumsComponent, 
    resolve:  {
      appResolver: AppResolver
    },
    canActivate: [AppGuard]
  },
  { 
    path: 'artists/:search', 
    component: ArtistsComponent, 
    resolve:  {
      appResolver: AppResolver
    },
    canActivate: [AppGuard]
  },
  { 
    path: 'get-album/:id', 
    component: GetAlbumComponent, 
    resolve:  {
      appResolver: AppResolver
    },
    canActivate: [AppGuard],
    data: {
      name: 'Artists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent, ArtistsComponent, AlbumsComponent, GetAlbumComponent, SetTokenComponent];