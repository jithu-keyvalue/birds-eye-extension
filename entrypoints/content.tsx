import { createRoot } from "react-dom/client";
import ButtonComponent from "./content/ButtonComponent";
import ReactDOM from "react-dom";

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    const button = document.createElement('div');
    document.body.appendChild(button);
    createRoot(button).render(<ButtonComponent />);
  },
});
