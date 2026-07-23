import { create } from "zustand";
import { DEFAULT_AREA } from "@/lib/shops";
import type { AreaId, Genre, PaymentMethod } from "@/lib/types";

type MapUiState = {
  area: AreaId;
  /** 福岡エリア限定。null = すべて */
  district: string | null;
  payment: PaymentMethod | null;
  genre: Genre | null;
  cashlessOnly: boolean;
  searchQuery: string;
  selectedId: string | null;
  setArea: (a: AreaId) => void;
  setDistrict: (d: string | null) => void;
  setPayment: (p: PaymentMethod | null) => void;
  setGenre: (g: Genre | null) => void;
  setCashlessOnly: (v: boolean) => void;
  setSearchQuery: (q: string) => void;
  selectShop: (id: string | null) => void;
};

export const useMapUiStore = create<MapUiState>((set) => ({
  area: DEFAULT_AREA,
  district: null,
  payment: null,
  genre: null,
  cashlessOnly: false,
  searchQuery: "",
  selectedId: null,
  setArea: (area) => set({ area, district: null, selectedId: null }),
  setDistrict: (district) => set({ district, selectedId: null }),
  setPayment: (payment) => set({ payment }),
  setGenre: (genre) => set({ genre }),
  setCashlessOnly: (cashlessOnly) => set({ cashlessOnly }),
  setSearchQuery: (searchQuery) => set({ searchQuery, selectedId: null }),
  selectShop: (selectedId) => set({ selectedId }),
}));
