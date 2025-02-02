import { contextBridge, ipcRenderer } from "electron";
import type { Partner } from "../types";

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
