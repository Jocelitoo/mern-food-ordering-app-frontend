import { useCreateCheckoutSession } from '@/api/OrderApi';
import { useGetRestaurant } from '@/api/RestaurantApi';
import { CheckoutButton } from '@/components/CheckoutButton';
import { MenuItem } from '@/components/MenuItem';
import { OrderSummary } from '@/components/OrderSummary';
import { RestaurantInfo } from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { MenuItem as typeMenuItem } from '@/types/types';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: typeMenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id,
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // Salva os dados na session storage que são os dados que ficam salvos enquanto a página estiver aberta. Assim n precisamos gastar requisições ao backend nem salvar por longos períodos de tempo no localStorage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id,
      );

      // Salva os dados na session storage que são os dados que ficam salvos enquanto a página estiver aberta. Assim n precisamos gastar requisições ao backend nem salvar por longos períodos de tempo no localStorage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
      totalAmount:
        cartItems.reduce(
          (total, cartItem) => total + cartItem.price * cartItem.quantity,
          0,
        ) + restaurant.deliveryPrice,
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
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

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid gap-5 sm:grid-cols-[4fr_2fr] lg:px-16">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />

          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />

            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>

          <div className="mt-4 flex flex-col gap-4">
            <p>
              Dica de teste: Para concluir o pagamento, será pedido alguns
              dados. Na parte de email escreva um email aleatório e na parte do
              cartão de crédito copie os dados do cartão de teste
              disponibilizado abaixo
            </p>

            <p>Número do cartão: 5105105105105100</p>
            <p>MM/AA: 12/34</p>
            <p>CVC: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
