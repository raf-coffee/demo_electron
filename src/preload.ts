import { contextBridge, ipcRenderer } from "electron";

type Partner = {
  id: number;
  organization_type: string;
  name: string;
  ceo: string;
  email: string;
  phone: string;
  address: string;
  tax_id: string;
  rating: number;
};

const api = {
  getPartners: () => ipcRenderer.invoke("getPartners"),
  createPartner: (partner: Partner) =>
    ipcRenderer.invoke("createPartner", partner),
  updatePartner: (partner: Partner) =>
    ipcRenderer.invoke("updatePartner", partner),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
}
