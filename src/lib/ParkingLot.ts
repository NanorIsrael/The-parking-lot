// import { SetStateAction } from "react";

interface ParkingLot {}
export class ParkingLotImpl implements ParkingLot {
  MAX_SLOT_LIMIT = 20;
  slots: number[] | null[];

  constructor(parkingSize: number) {
    this.slots = new Array(11).fill(null);
    console.log("from class parkingSize length", this.slots.length);
  }

  setParkingLot() {
    const availableSlot = this.availableSlot();
    const slotIndex = Math.ceil(Math.random() * (availableSlot.length - 1));

    const parkingId = Math.ceil(Math.random() * 999);
    if (availableSlot.length > 0) {
      this.slots[availableSlot[slotIndex]] = parkingId;
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
    return tempSlots;
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
    return this.availableSlot().length === 0;
  }
}
