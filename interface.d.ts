import type { Partner } from "../../types";

export interface API {
  getPartners: () => Promise<void>;
  createPartner: (partner: Partner) => Promise<void>;
  updatePartner: (partner: Partner) => Promise<void>;
}

declare global {
  interface Window {
    api: API;
  }
}
