import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }
  loginData = {
    username: '',
    password: ''
  }

  formSubmit() {
    console.log('login btn clicked');

    if (
      this.loginData.password.trim() == '' || this.loginData.username.trim() == ''
    ) {
      this.snack.open('User and Password is required !!', '', {
        duration: 3000
      });
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        console.log(data);
        this.login.loginUser(data.token);

        this.login.getCurrrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            if (this.login.getUserRole() == 'ADMIN') {

              //window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);

            } else if (this.login.getUserRole() == 'NORMAL') {

              //window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }
            else {
              this.login.logout();
            }

          });
      },
      (error) => {
        console.log("error");
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );

  }
}
