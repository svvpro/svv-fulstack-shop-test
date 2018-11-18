import {ElementRef} from "@angular/core";

export interface ModalInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

declare var M;

export class MaterializeService {
  static toast(message: string): void {
    M.toast({html: message});
  }

  static updateTextFields(): void {
    M.updateTextFields();
  }

  static modalInit(elems: ElementRef): ModalInstance {
    return M.Modal.init(elems.nativeElement);
  }
}
