import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { LoadingServiceService } from 'src/app/services/loader/loading-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public loadingService: LoadingServiceService,
    private userauth: UserAuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      cpassword: [null],
      npassword: [null],
    });
  }

  changepwd() {
    if (this.formGroup.valid) {
      let username = localStorage.getItem('username');
      //console.log(this.formGroup.value["cpassword"]);
      this.userauth.changepwd({
        username: username,
        cpassword: this.formGroup.value['cpassword'],
        npassword: this.formGroup.value['npassword'],
      });
    }
  }
}
