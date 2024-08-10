import { OrderStatus } from '@/types/types';

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  {
    label: 'Aguardando pagamento',
    value: 'placed',
    progressValue: 0,
  },
  {
    label: 'Esperando confirmação do restaurante',
    value: 'paid',
    progressValue: 25,
  },
  {
    label: 'Pedido sendo preparado',
    value: 'inProgress',
    progressValue: 50,
  },
  {
    label: 'Saiu para entrega',
    value: 'outForDelivery',
    progressValue: 75,
  },
  {
    label: 'Entregue',
    value: 'delivered',
    progressValue: 100,
  },
];
