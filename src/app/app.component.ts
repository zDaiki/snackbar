import { Component } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';

import { NgModule } from '@angular/core';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SnackbarComponent, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private snackbarService: SnackbarService) {}

  showSuccessSnackbar(): void {
    this.snackbarService.success('Operation completed successfully!');
  }

  showErrorSnackbar(): void {
    this.snackbarService.error('An error occurred. Please try again later.');
  }

  showInfoSnackbar(): void {
    this.snackbarService.info('This is an informational message.');
  }

  showWarningSnackbar(): void {
    this.snackbarService.warning('Warning: You are about to perform an action that cannot be undone.');
  }

  showSnackbarWithAction(): void {
    this.snackbarService.show(
      'Item deleted',
      'info',
      1000,
      'UNDO'
    );
  }

  handleSnackbarAction(): void {
    console.log('Snackbar action clicked!');
    // Implement your action logic here
    // For example: restoring a deleted item
    this.snackbarService.success('Item restored!');
  }
}