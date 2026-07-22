import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PaymentMethod, PaymentReport, ReportKind } from "@/lib/types";

type ReportState = {
  reports: PaymentReport[];
  addReport: (shopId: string, method: PaymentMethod, kind: ReportKind) => void;
};

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      reports: [],
      addReport: (shopId, method, kind) =>
        set((state) => ({
          reports: [
            ...state.reports,
            {
              shopId,
              method,
              kind,
              at: new Date().toISOString(),
            },
          ],
        })),
    }),
    { name: "paymap.reports.v1" },
  ),
);
