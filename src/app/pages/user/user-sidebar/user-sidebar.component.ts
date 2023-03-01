import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

categories:any;

  constructor(private cat:CategoryService,private snack:MatSnackBar){}

  ngOnInit(): void {
    this.cat.categories().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      this.snack.open("Error in loading",'',{
        duration:3000,
      });
    }
    )
  }


}
