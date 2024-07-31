import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cuisineList } from '@/config/restaurant-options-config';
import { useFormContext } from 'react-hook-form';
import { CuisineCheckbox } from './CuisineCheckbox';

export const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Cardápio</h2>
        <FormDescription>
          Selecione o cardápio do seu restaurante
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-1 sm:grid-cols-5">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox
                  cuisine={cuisineItem}
                  field={field}
                  key={cuisineItem}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
