import { createRoot } from "react-dom/client";
import ButtonComponent from "./content/ButtonComponent";
import ReactDOM from "react-dom";

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
  const state = new State();
    
  useEffect(() => {
    if(state.level !== 0) {
      document.body.innerHTML = '';
      document.body.appendChild(root);
    }
    else {
      document.body.innerHTML = state.originalHtml;
      document.body.appendChild(floatingButton);
    }
  }, [state.level]);
  
    const root = document.createElement('div');
    createRoot(root).render(<ContentReactRoot />);
    
    const floatingButton = document.createElement('div');
    createRoot(floatingButton).render(<ButtonComponent state={state} />);

  }
});


export const ContentReactRoot = () => {
  return (
    <div>content</div>
  )
}

export class State {
  public level;
  public mode;
  public originalHtml;

  constructor() {
    this.level = 0;
    this.mode = 'professional';
    this.originalHtml = document.body.innerHTML;
  }
}