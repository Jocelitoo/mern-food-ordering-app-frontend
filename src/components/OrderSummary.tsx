import { CartItem } from '@/pages/DetailsPage';
import { Restaurant } from '@/types/types';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FaTrash } from 'react-icons/fa';

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Seu pedido</span>
          <span>R${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>

            <span className="flex items-center gap-1">
              <FaTrash
                className="cursor-pointer fill-red-600 mr-2"
                onClick={() => removeFromCart(item)}
              />
              R${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between ">
          <span>Delivery</span>
          <span>R${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>

        <Separator />
      </CardContent>
    </>
  );
};
