import { Restaurant } from '@/types/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { LuDot } from 'react-icons/lu';
import { FaClock } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

type Props = {
  restaurant: Restaurant;
};

export const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
          alt=""
        />
      </AspectRatio>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>

        <div id="card-content" className="grid gap-2 sm:grid-cols-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span key={index} className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && (
                  <LuDot className="text-2xl" />
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <FaClock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>

            <div className="flex items-center gap-1">
              <MdAttachMoney />
              Entrega por R${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
