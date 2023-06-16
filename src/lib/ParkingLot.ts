// import { SetStateAction } from "react";

export interface ParkingLot {
  slots: number[] | null[];
  setParkingLot: () => ParkingLot
  availableSlot: () => number
  getParkingLot: (parkingId: number) => number
  removeParkingLot: (parkingId: number) => ParkingLot
  isFull: () => boolean
}
export class ParkingLotImpl implements ParkingLot {
  MAX_SLOT_LIMIT = 20;
  slots: number[] | null[];

  constructor(parkingSize = 0) {
    this.slots = new Array(parkingSize).fill(null);
  }

  setParkingLot() {
    const availableSlot = this.availableSlot();
    // const slotIndex = Math.ceil(Math.random() * (availableSlot - 1));

    const parkingId = Math.ceil(Math.random() * 999);
    if (availableSlot > 0) {
      for (let i = 0; i < this.slots.length; i++) {
        if (this.slots[i] === null) {
          this.slots[i] = parkingId;
          break;
        }
      }
    }

    return this;
  }

  availableSlot() {
    const tempSlots = [];

    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i] === null) {
        tempSlots.push(i);
      }
    }
    return tempSlots.length;
  }

  getParkingLot(parkingId: number): number {
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i] === parkingId) {
        // this.slots[i] = null;
        return i;
      }
    }
    return -1;
  }

  removeParkingLot(parkingId: number) {
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i] === parkingId) {
        this.slots[i] = null;
      }
    }
    return this;
  }

  isFull() {
    return this.availableSlot() === 0;
  }
}
