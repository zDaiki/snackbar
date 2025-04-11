import { Component } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  constructor(private snackbarService: SnackbarService) {}

  showSuccessSnackbar(): void {
    this.snackbarService.success('this is my success snackbar');
  }
}
