export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarConfig {
  message: string;
  type: SnackbarType;
  duration: number;
  action?: string;
  showCloseButton?: boolean;
}

export interface SnackbarData extends SnackbarConfig {
  id: number;
  show: boolean;
}