import { Order } from '@/types/types';
import { Separator } from './ui/separator';

type Props = {
  order: Order;
};

export const OrderStatusDetails = ({ order }: Props) => {
  return (
    <div>
      <div className="space-y-10">
        <div>
          <p className="font-bold">Entregando para:</p>
          <p>{order.deliveryDetails.name}</p>
          <p>
            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
          </p>
        </div>

        <div>
          <p className="font-bold">Seu pedido:</p>
          <ul>
            {order.cartItems.map((item, index) => (
              <li key={index}>
                - {item.name} x{item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div>
          <p className="font-bold">Total:</p>
          <p>R$ {(order.totalAmount / 100).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
