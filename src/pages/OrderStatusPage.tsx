import { useGetMyOrders } from '@/api/OrderApi';
import { OrderStatusDetails } from '@/components/OrderStatusDetails';
import { OrderStatusHeader } from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div
        className="flex flex-col justify-center items-center gap-3
  "
      >
        <AiOutlineLoading3Quarters className="animate-spin size-24" />
        <p>Carregando...</p>
        <p className="text-center">
          <span className="uppercase font-bold">Obs:</span> Caso esteja
          demorando, saiba que é normal demorar um pouco na primeira requisição
          feita à API
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <p>Nenhum pedido encontrado</p>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order, index) => (
        <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />

          <div className="grid grid-cols-1 gap-10 justify-between sm:grid-cols-2">
            <OrderStatusDetails order={order} />

            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};
