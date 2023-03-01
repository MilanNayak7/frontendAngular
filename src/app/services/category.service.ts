import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http:HttpClient){}
  
//load all category
public categories(){
  return this.http.get(`${baseUrl}/category/`);
}

//add new category
public addCategory(category:any){
return this.http.post(`${baseUrl}/category/`,category).subscribe(this.myObserver);
}

myObserver: Observer<any> = {
  next: value => {
    Swal.fire('Success !!','Category is added successfully','success');
  },
  error: err => {
    console.error(err);
    Swal.fire('server error !!','','success');
  },
  complete: () => {
    console.log('Done!');
  }
};


}
