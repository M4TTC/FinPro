import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { LoadingServiceService } from 'src/app/services/loader/loading-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formGroup!: FormGroup;
  hide = true;

  constructor(
    public loaddingService: LoadingServiceService,
    private formBuilder: FormBuilder,
    private route: Router,
    private userAuth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null],
      password: [null],
    });
  }

  signup() {
    if (this.formGroup.valid) {
      this.userAuth.signup(this.formGroup.value);
    }
  }
}
