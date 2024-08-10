import { Order } from '@/types/types';
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '@/config/order-status-config';

type Props = {
  order: Order;
};

export const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime,
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 sm:flex-row sm:justify-between">
        <span>Status do pedido: {getOrderStatusInfo().label}</span>
        {order.status === 'placed' ? (
          <a href={order.paymentLink} className="border-b-2 border-black">
            Efetuar pagamento
          </a>
        ) : (
          <span>Entrega estimada para: {getExpectedDelivery()}</span>
        )}
      </h1>

      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};
