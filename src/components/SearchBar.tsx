import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { CiSearch } from 'react-icons/ci';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect } from 'react';

const formSchema = z.object({
  searchQuery: z.string({
    required_error: 'Restaurant name is required',
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery: string;
};

export const SearchBar = ({
  onSubmit,
  placeHolder,
  onReset,
  searchQuery,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: '',
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-row gap-3 justify-between border-2 rounded-full p-3 ${form.formState.errors.searchQuery && 'border-red-500'}`}
      >
        <CiSearch
          strokeWidth={1}
          size={30}
          className="ml-1 text-orange-500 hidden sm:!block"
        />

        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Limpar
        </Button>

        <Button type="submit" className="rounded-full bg-orange-500">
          Buscar
        </Button>
      </form>
    </Form>
  );
};
