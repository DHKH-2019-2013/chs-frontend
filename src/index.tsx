import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/component/app";

import "./app/style/style.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);
