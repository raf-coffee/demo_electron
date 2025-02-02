import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import CreatePartner from "./CreatePartner";
import UpdatePartner from "./UpdatePartner";

const root = createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/create" element={<CreatePartner />} />
      <Route path="/update" element={<UpdatePartner />} />
    </Routes>
  </HashRouter>
);
