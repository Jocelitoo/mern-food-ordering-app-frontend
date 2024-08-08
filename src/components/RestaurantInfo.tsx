import { Restaurant } from '@/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { LuDot } from 'react-icons/lu';

type Props = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>

        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>

        <CardContent className="flex !p-0">
          {restaurant.cuisines.map((item, index) => (
            <span key={index} className="flex">
              <span>{item}</span>
              {index < restaurant.cuisines.length - 1 && (
                <LuDot className="text-2xl" />
              )}
            </span>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
