import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackbarConfig, SnackbarData, SnackbarType } from '../models/snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new BehaviorSubject<SnackbarData | null>(null);
  private counter = 0;
  private timeoutId: any;

  /** Observable that components can subscribe to for snackbar updates */
  snackbarState$: Observable<SnackbarData | null> = this.snackbarSubject.asObservable();

  
  show(
    message: string, 
    type: SnackbarType = 'info', 
    duration: number = 3000, 
    action?: string,
    showCloseButton: boolean = true
  ): number {
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Generate a unique ID for this snackbar instance
    const id = ++this.counter;

    // Emit the new snackbar state
    this.snackbarSubject.next({
      id,
      show: true,
      message,
      type,
      duration,
      action,
      showCloseButton
    });

    // Set up auto-dismiss after duration
    if (duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  /**
   * Show a success snackbar
   */
  success(message: string, duration: number = 2000, action?: string): number {
    return this.show(message, 'success', duration, action);
  }

  /**
   * Show an error snackbar
   */
  error(message: string, duration: number = 2000, action?: string): number {
    return this.show(message, 'error', duration, action);
  }

  /**
   * Show an info snackbar
   */
  info(message: string, duration: number = 2000, action?: string): number {
    return this.show(message, 'info', duration, action);
  }

  /**
   * Show a warning snackbar
   */
  warning(message: string, duration: number = 2000, action?: string): number {
    return this.show(message, 'warning', duration, action);
  }

  //dismiss
  dismiss(id?: number): void {
    const current = this.snackbarSubject.value;
    
    // Only dismiss if there's a snackbar and either no ID was provided or the ID matches
    if (current && (!id || current.id === id)) {
      this.snackbarSubject.next({
        ...current,
        show: false
      });
      
      // Clear any existing timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }
}