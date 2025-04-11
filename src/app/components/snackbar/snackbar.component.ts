import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackbarData } from '../../models/snackbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('snackbarAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0,
          transform: 'translateY(100%)' 
        }),
        animate('300ms ease-out', style({ 
          opacity: 1,
          transform: 'translateY(0)' 
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ 
          opacity: 0,
          transform: 'translateY(100%)' 
        }))
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Output() action = new EventEmitter<void>();
  
  snackbarData: SnackbarData | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.subscription = this.snackbarService.snackbarState$.subscribe(data => {
      this.snackbarData = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Dismiss the current snackbar
   */
  dismiss(): void {
    if (this.snackbarData) {
      this.snackbarService.dismiss(this.snackbarData.id);
    }
  }

  /**
   * Handle action button click
   */
  onActionClick(): void {
    this.action.emit();
    this.dismiss();
  }
}