import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ReactLenis>
  </StrictMode>,
);
