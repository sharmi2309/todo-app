import { Component } from '@angular/core';
import { RouterLink,Router } from "@angular/router";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){}
  login(){
     sessionStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  register(){
    this.router.navigate(['/register'])
  }

}
  