import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Toast } from '../../models/toaster';
import { ToastType } from '../../enum/toast-type-enum';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    this.subject = new BehaviorSubject<any>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show(type: ToastType, title: string, body: string, delay: number) {
    this.subject.next({ type, title, body, delay });
  }
}