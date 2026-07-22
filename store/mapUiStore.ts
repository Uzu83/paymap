import { create } from "zustand";
import type { Genre, PaymentMethod } from "@/lib/types";

type MapUiState = {
  payment: PaymentMethod | null;
  genre: Genre | null;
  cashlessOnly: boolean;
  selectedId: string | null;
  setPayment: (p: PaymentMethod | null) => void;
  setGenre: (g: Genre | null) => void;
  setCashlessOnly: (v: boolean) => void;
  selectShop: (id: string | null) => void;
};

export const useMapUiStore = create<MapUiState>((set) => ({
  payment: null,
  genre: null,
  cashlessOnly: false,
  selectedId: null,
  setPayment: (payment) => set({ payment }),
  setGenre: (genre) => set({ genre }),
  setCashlessOnly: (cashlessOnly) => set({ cashlessOnly }),
  selectShop: (selectedId) => set({ selectedId }),
}));
