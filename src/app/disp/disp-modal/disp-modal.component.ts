import { Component, Input } from '@angular/core';
import { DispModalService } from '../disp-modal.service';

@Component({
  selector: 'app-disp-modal',
  templateUrl: './disp-modal.component.html',
  styleUrls: ['./disp-modal.component.css'],
})
export class DispModalComponent {
  @Input() modalID = '';
  @Input() title = '';

  constructor(public dispModalSer: DispModalService) {}

  openModal() {
    if (!this.dispModalSer.isModalVisible(this.modalID)) {
      this.dispModalSer.toggleModal(this.modalID);
    }
  }

  closeModal() {
    if (this.dispModalSer.isModalVisible(this.modalID)) {
      this.dispModalSer.toggleModal(this.modalID);
    }
  }
}
