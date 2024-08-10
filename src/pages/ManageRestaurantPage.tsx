import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';
import { OrderItemCard } from '@/components/OrderItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManageRestaurantForm } from '@/forms/manage-restaurant-form/ManageRestaurantForm';

export const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Pedidos</TabsTrigger>
        <TabsTrigger value="manage-restaurant">
          Administrar restaurante
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pb-10 rounded-lg"
      >
        <h2 className="font-bold text-2xl">
          {orders?.length}{' '}
          {orders?.length === 1 ? 'pedido ativo' : 'pedidos ativos'}
        </h2>

        {orders?.map((order, index) => (
          <OrderItemCard key={index} order={order} />
        ))}
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};
