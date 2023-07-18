/* Simple In-Memory observer-pattern-based single-threaded message
    bus for designing architecture and testing using unit tests
    before switching to using actual middlewares
 */
interface Listener {
  onMessage(message: any): void;
}

class AnyEvent {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

class MessageBus {
  subs: Listener[];

  subscribe(listener: Listener): void {
    this.subs.push(listener);
  }

  send(event: AnyEvent): void {
    for (const sub of this.subs) {
      sub.onMessage(event);
    }
  }
}

/** Usage producer **/
class BookingService implements Listener {
  readonly bus: MessageBus;

  constructor(bus: MessageBus) {
    this.bus = bus;
  }

  bookTicket(ticketNumber: number) {
    console.log("ticket booked");
    this.bus.send(new AnyEvent("post.ticket.booked", ticketNumber))
  }

  onMessage(message: any): void {}
}

/** Usage consumer */
class InventoryService implements Listener {
  readonly bus: MessageBus;
  capacity: number;

  constructor(bus: MessageBus, initialCapacity: number = 0) {
     this.bus = bus;
    this.capacity = initialCapacity;
  }

  onMessage(message: any): void {
    const event: AnyEvent = message as AnyEvent;
    if(event.value > 1 && this.capacity > 0) this.capacity = this.capacity - 1;
  }

}
