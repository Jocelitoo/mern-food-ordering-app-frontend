import { Order, OrderStatus } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectItem, SelectTrigger } from './ui/select';
import { SelectContent, SelectValue } from '@radix-ui/react-select';
import { ORDER_STATUS } from '@/config/order-status-config';
import { useUpdateMyRestaurantOrder } from '@/api/MyRestaurantApi';
import { useEffect, useState } from 'react';

type Props = {
  order: Order;
};

export const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });

    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid gap-4 justify-between sm:grid-cols-4">
          <div>
            Nome do cliente:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>

          <div>
            Endereço de entrega:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>

          <div>
            Hora:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Total:
            <span className="ml-2 font-normal">
              R$ {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-4 mt-4">
        {order.status === 'placed' ? (
          <p>O pedido ainda não foi pago</p>
        ) : (
          <>
            <ul className="space-y-2">
              {order.cartItems.map((item, index) => (
                <li key={index}>
                  <Badge variant={'outline'}>
                    {item.name} x{item.quantity}
                  </Badge>
                </li>
              ))}
            </ul>

            <div className="space-y-1.5">
              <Label htmlFor="status">Qual é o status desse pedido ?</Label>

              <Select
                value={status}
                disabled={isLoading}
                onValueChange={(value) =>
                  handleStatusChange(value as OrderStatus)
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {ORDER_STATUS.map((status, index) => (
                    <SelectItem key={index} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
