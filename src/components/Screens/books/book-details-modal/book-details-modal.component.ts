import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // NgbActiveModal'ü ekleyin

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent {
  @Input() book: any; // Kitap verisini giriş olarak al

  constructor(public activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.dismiss(); // Modalı kapat
  }

  orderBook() {
    // Sipariş etmek için gereken işlemleri burada yapabilirsiniz
    console.log('Kitap sipariş edildi.');
    this.activeModal.dismiss(); // Modalı kapat
  }
}
