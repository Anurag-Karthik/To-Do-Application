import { Injectable } from '@angular/core';

interface modalModel {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DispModalService {
  private modals: modalModel[] = [];

  constructor() {}

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((ele) => ele.id !== id);
  }

  isModalVisible(id: string): boolean {
    return !!this.modals.find((ele) => id === ele.id)?.visible;
  }

  toggleModal(id: string) {
    const modalToBeTog: modalModel = this.modals.find((ele) => id === ele.id)!;
    if (modalToBeTog) {
      modalToBeTog.visible = !modalToBeTog.visible;
    }
  }

  openModal(id: string) {
    if (!this.isModalVisible(id)) {
      this.toggleModal(id);
    }
  }

  closeModal(id: string) {
    if (this.isModalVisible(id)) {
      this.toggleModal(id);
    }
  }
}
