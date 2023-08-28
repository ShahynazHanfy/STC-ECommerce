import { ToastType } from '../enum/toast-type-enum'

export interface Toast {
  type: ToastType;
  title: string;
  body: string;
  delay: number;
}