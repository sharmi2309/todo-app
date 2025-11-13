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
  username: string = '';

  ngOnInit() {
    const storedUser = sessionStorage.getItem('username');
    if (storedUser) {
      this.username = storedUser;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login'])
  }


}
  