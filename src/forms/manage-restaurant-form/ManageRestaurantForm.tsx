import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DetailsSection } from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import { CuisinesSection } from './CuisinesSection';
import { MenuSection } from './MenuSection';
import { ImageSection } from './ImageSection';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types/types';
import { useEffect } from 'react';

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: 'Nome do restaurante é obrigatório',
    }),

    city: z.string({
      required_error: 'Nome da cidade é obrigatório',
    }),

    country: z.string({
      required_error: 'Nome do país é obrigatório',
    }),

    deliveryPrice: z.coerce.number({
      required_error: 'O preço da entrega é obrigatório',
      invalid_type_error: 'É preciso ser um número válido',
    }),

    estimatedDeliveryTime: z.coerce.number({
      required_error: 'Tempo de entrega estimado é obrigatório',
      invalid_type_error: 'É preciso ser um número válido',
    }),

    cuisines: z.array(z.string()).nonempty({
      message: 'Selecione no mínimo 1 item',
    }),

    menuItems: z.array(
      z.object({
        name: z.string().min(1, 'Nome é obrigatório'),
        price: z.coerce.number().min(1, 'Preço é obrigatório'),
      }),
    ),

    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: 'É preciso uma imagem' })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: 'Url da imagem ou o arquivo da imagem precisam ser enviados',
    path: ['imageFile'],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  restaurant?: Restaurant;
  isLoading: boolean;
};

export const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2),
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append('restaurantName', formDataJson.restaurantName);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append(
      'deliveryPrice',
      (formDataJson.deliveryPrice * 100).toString(),
    );
    formData.append(
      'estimatedDeliveryTime',
      formDataJson.estimatedDeliveryTime.toString(),
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString(),
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Enviar</Button>}
      </form>
    </Form>
  );
};
