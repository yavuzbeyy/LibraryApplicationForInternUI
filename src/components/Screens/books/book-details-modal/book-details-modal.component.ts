import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent {
  @Input() book: any;
  borrowDate: string = ''; 
  returnDate: string= ''; 

  constructor(public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss();
  }

  orderBook() {
    if (this.borrowDate && this.returnDate) {
      console.log('Alış Tarihi:', this.borrowDate);
      console.log('Geri Veriş Tarihi:', this.returnDate);

      console.log('Kitap sipariş edildi.');
      this.activeModal.dismiss();
    } else {
      alert('Lütfen alış ve geri veriş tarihlerini seçin.');
    }
  }
}
