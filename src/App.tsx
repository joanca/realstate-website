import { useEffect, useLayoutEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { normalizeEmbeddedDom } from "./modules/embed/normalizeEmbeddedDom";
import { router } from "./router";
import styles from "./App.module.css";

export default function App() {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-emily-loading");
    document.getElementById("emily-preload-hide")?.remove();
  }, []);

  useEffect(() => {
    normalizeEmbeddedDom();
  }, []);

  return (
    <div className={styles.root}>
      <RouterProvider router={router} />
    </div>
  );
}
