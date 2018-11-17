import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterializeService} from "../shared/classes/materialize.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.toast('You have successfully registered')
      } else if (params['accessDenied']) {
        MaterializeService.toast('Access denied');
      } else if (params['sessionFailed']) {
        MaterializeService.toast('The lifetime of the session is over');
      }
    })

  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  submit(): void {
    this.form.disable();
    this.aSub = this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
        MaterializeService.toast('You have successfully authorithed!');
      },
      error => {
        MaterializeService.toast(error.error.message);
        this.form.enable();
      }
    );
  }

}
