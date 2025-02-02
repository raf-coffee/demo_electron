import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { Client } from "pg";
import { join } from "path";
import type { Partner } from "../types";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

async function getPartners() {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = +process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB_NAME;

  const client = new Client({
    user,
    password,
    host,
    port,
    database,
  });
  await client.connect();

  try {
    const response = await client.query(`SELECT T1.*,
    CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
    WHEN sum(T2.production_quantity) > 50000 THEN 10
    WHEN sum(T2.production_quantity) > 10000 THEN 5
    ELSE 0 
    END as discount
    from partners as T1
    LEFT JOIN sales as T2 on T1.id = T2.partner_id
    GROUP BY T1.id`);
    return response.rows;
  } catch (e) {
    console.log(e);
  }
}
async function createPartner(
  event: Electron.IpcMainInvokeEvent,
  partner: Partner
) {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = +process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB_NAME;

  const client = new Client({
    user,
    password,
    host,
    port,
    database,
  });
  await client.connect();

  const { type, name, ceo, email, phone, address, rating } = partner;
  try {
    await client.query(
      `INSERT into partners (organization_type, name, ceo, email, phone, address, rating) values('${type}', '${name}', '${ceo}', '${email}', '${phone}', '${address}', ${rating})`
    );
    dialog.showMessageBox({ message: "Успех! Партнер создан" });
  } catch (e) {
    console.log(e);
    dialog.showErrorBox("Ошибка", "Партнер с таким именем уже есть");
  }
}
async function updatePartner(
  event: Electron.IpcMainInvokeEvent,
  partner: Partner
) {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = +process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB_NAME;

  const client = new Client({
    user,
    password,
    host,
    port,
    database,
  });
  await client.connect();

  const { id, type, name, ceo, email, phone, address, rating } = partner;
  try {
    await client.query(`UPDATE partners
      SET name = '${name}', organization_type = '${type}', ceo='${ceo}', email='${email}', phone='${phone}', address='${address}', rating='${rating}'
      WHERE partners.id = ${id};`);
    dialog.showMessageBox({ message: "Успех! Данные обновлены" });
    return;
  } catch (e) {
    dialog.showErrorBox(
      "Невозможно создать пользователя",
      "Такой пользователь уже есть"
    );
    return "error";
  }
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon: join(__dirname, "../../resources/icon.png"),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  ipcMain.handle("getPartners", getPartners);
  ipcMain.handle("createPartner", createPartner);
  ipcMain.handle("updatePartner", updatePartner);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
