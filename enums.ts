/** Cutting use of structural type system to more type declaration system :pray: */
type MyEvent<T extends string> = {
    type: T,
    value: string,
}
  
/** Specific Id types */
type CustomerCreatedEvent = MyEvent<'post.customer.created'>;
type OrderSentEvent = MyEvent<'post.order.sent'>;
  
  /** Optional: constructors functions */
  const createEventCustomerCreated = (value: string): CustomerCreatedEvent => ({ type: 'post.customer.created', value });
  const createEventOrderSent = (value: string): OrderSentEvent => ({ type: 'post.order.sent', value });
  
  let customer = createEventCustomerCreated('{ "userId": 123 }')
  let order = createEventOrderSent('{ "orderId": 456 }');
  
  customer = order; // Error
  customer = customer; // Okay