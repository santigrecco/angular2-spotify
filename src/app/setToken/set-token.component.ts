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


  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {


    this.route.fragment.subscribe((fragment: string) => {
      let fragments = fragment.split('&');
      let token = fragments[0].split('=')[1];
      let expires_in = fragments[2].split('=')[1]
      this.authService.setToken(token, expires_in);

      setTimeout(() => this.router.navigate(["/home"]));
    });
  }
}