import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

categories:any;

  constructor(private cat:CategoryService,private snack:MatSnackBar){}

  ngOnInit(): void {
    this.cat.categories().subscribe(this.categoryObserver)

  }

  categoryObserver: Observer<any> = {
    next: value => {
      this.categories = value;
    },
    error: err => {
      console.error(err);
      Swal.fire('server error !!','Error in loading','error');
    },
    complete: () => {
      console.log('Done!');
    }
  };


}
