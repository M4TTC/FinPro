import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { LoadingServiceService } from 'src/app/services/loader/loading-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;

  constructor(
    public loadingService: LoadingServiceService,
    private formBuilder: FormBuilder,
    private userAuth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.userAuth.login(this.formGroup.value);
    }
  }
}
