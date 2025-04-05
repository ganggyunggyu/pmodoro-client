import { create } from 'zustand';

type SearchState = {
  searchQuery: string;
  searchResults: string[]; // 예시로 string 배열을 사용, 실제로는 객체 배열이나 다른 형태일 수 있어
  isLoading: boolean;

  selectedPosition: string;
};

type SearchActions = {
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetSearch: () => void;

  setSelectedPosition: (position: string) => void;
};

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  searchQuery: '',
  searchResults: [],
  isLoading: false,
  selectedPosition: '전체',

  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
  setSearchResults: (results) => set(() => ({ searchResults: results })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  resetSearch: () =>
    set(() => ({
      searchQuery: '',
      searchResults: [],
      isLoading: false,
    })),

  setSelectedPosition: (selectedPosition) => set(() => ({ selectedPosition })),
}));
