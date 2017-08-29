/**
 * Created by leopoldo.barrau on 6/26/2017.
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  template: ''
})
export class SetTokenComponent implements OnInit {


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string) => {

      let fragments = fragment.split('&');

      this.authService.setToken(fragments[0].split('=')[1]);

      setTimeout(() => this.router.navigate(["/home"]));
    });
  }
}