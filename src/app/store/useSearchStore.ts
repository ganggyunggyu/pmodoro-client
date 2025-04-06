import { create } from 'zustand';

type SearchQuery = {
  position: string;
  skills: string[];
  carrear: string;
  isOnline: boolean | null;
  firstArea: string;
  secondArea: string;
  q: string;
};

export type SearchQueryState = {
  searchQuery: SearchQuery;
};

export type SearchQueryActions = {
  setSearchQueryField: <T extends keyof SearchQuery>(
    field: T,
    value: SearchQuery[T],
  ) => void;
  toggleSkill: (skill: string) => void;
  reset: () => void;
};

export const useSearchStore = create<SearchQueryState & SearchQueryActions>(
  (set) => ({
    searchQuery: {
      position: '전체',
      skills: [],
      carrear: '',
      isOnline: null,
      firstArea: '',
      secondArea: '',
      q: '',
    },

    // 특정 필드 업데이트 액션
    setSearchQueryField: (field, value) =>
      set((state) => ({
        searchQuery: {
          ...state.searchQuery,
          [field]: value,
        },
      })),

    // 기술 선택/해제 토글
    toggleSkill: (skill) =>
      set((state) => ({
        searchQuery: {
          ...state.searchQuery,
          skills: state.searchQuery.skills.includes(skill)
            ? state.searchQuery.skills.filter((s) => s !== skill)
            : [...state.searchQuery.skills, skill],
        },
      })),

    // 상태 초기화 액션
    reset: () =>
      set({
        searchQuery: {
          position: '',
          skills: [],
          carrear: '',
          isOnline: null,
          firstArea: '',
          secondArea: '',
          q: '',
        },
      }),
  }),
);
