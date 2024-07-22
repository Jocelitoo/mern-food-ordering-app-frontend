import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export const ImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch('imageUrl');

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Imagem</h2>
        <FormDescription>
          Adicione uma imagem relacionada ao seu restaurante para aparecer na
          barra de pesquisa. Adicionar uma nova imagem ira sobrescrever a imagem
          antiga
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 sm:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
