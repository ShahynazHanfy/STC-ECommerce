import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent {
  @Input() icon: string = '';
  @Input() btnConfirmContent: string = '';
  @Input() mainContent: string = '';
  @Input() btnConfirmColor: string = '';
  @Input() Index!: number;
  @Output() confirmAction= new EventEmitter<response>();


  @ViewChild('test') test!:ElementRef;
  constructor() {}

  ngOnInit() {}
  
  applyAction(){
    console.log(this.test)
    this.test.nativeElement.click()
    this.confirmAction.emit({res:true, ref:this.test,btnConfirmContent:this.btnConfirmContent});
  }

}

interface response {
  res:boolean,
  ref:ElementRef,
  btnConfirmContent:string
}
