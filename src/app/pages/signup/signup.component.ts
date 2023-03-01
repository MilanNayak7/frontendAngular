import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user = {
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  formSubmit(){
    console.log("Submit Button is clicked");
    console.log(this.user);
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open('Username is required !!','ok',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'left'
      })
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire('Success','User is registered with id'+data.id,'success');
      },
      (error)=>{
        console.log(error)
        alert('something went wrong');
      }
    )

  }

}
