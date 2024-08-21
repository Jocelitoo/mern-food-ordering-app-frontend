import { useSearchRestaurants } from '@/api/RestaurantApi';
import { CuisineFilter } from '@/components/CuisineFilter';
import { PaginationSelector } from '@/components/PaginationSelector';
import { SearchBar, SearchForm } from '@/components/SearchBar';
import { SearchResultCard } from '@/components/SearchResultCard';
import { SearchResultInfo } from '@/components/SearchResultInfo';
import { SortOptionDropdown } from '@/components/SortOptionDropdown';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

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

  if (!results?.data || !city) {
    console.log('oi');
    return <span>Nenhum resultado encontrado</span>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Procure pelo cardápio ou nome do restaurante"
          onReset={resetSearch}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />

          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, index) => (
          <SearchResultCard key={index} restaurant={restaurant} />
        ))}

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
