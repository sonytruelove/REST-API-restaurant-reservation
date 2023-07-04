export class Counter {
  constructor(count) {
    this.count = count;
  }

  set(value) {
    this.count = value;
  }

  increase(value) {
    this.count += value;
  }
  decrease(value) {
    this.count -= value;
  }
}
