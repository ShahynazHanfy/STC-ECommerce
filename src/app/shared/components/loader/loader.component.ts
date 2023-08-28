import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent {
  isLoading$!:Observable<boolean>
  constructor(private loaderService:LoaderService) { }

  ngOnInit() {
    this.isLoading$ = this.loaderService.isLoading.asObservable()
    console.log("loading")
  }
}
