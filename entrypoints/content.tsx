import { createRoot } from "react-dom/client";
import ButtonComponent from "./content/ButtonComponent";
import React from "react";
import CustomLayout from "./content/CustomLayout";
import { fetchMultiLevelNotes, fetchMultiLevelSummaries } from "./content/api";

export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    const state = new State();

    // Create root elements for the floating button and the custom layout
    const floatingButton = document.createElement("div");
    const root = document.createElement("div");

    const floatingButtonRoot = createRoot(floatingButton);
    const rootRoot = createRoot(root);

    // Add root containers to the body
    document.body.appendChild(floatingButton);
    document.body.appendChild(root);

    // Render the floating button which will control the state
    floatingButtonRoot.render(
      <ButtonComponent state={state} onLevelChange={handleLevelChange} />
    );

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.counter >= 0) handleLevelChange(message.counter);
    });

    // Function to handle level change (from button or other components)
    function handleLevelChange(newLevel: number) {
      state.level = newLevel;
      updateContent();
    }

    // Function to update the content based on the current level
    function updateContent() {
      rootRoot.render(<ContentReactRoot state={state} />);
      if (state.level !== 0) {
        // If level is not 0, show custom content
        document.body.innerHTML = ""; // Clear the body
        document.body.appendChild(root); // Attach root element for React rendering
        // let rootRoot;
        // if(!rootRoot) {
        //   rootRoot = createRoot(root);
        //   rootRoot.render(<ContentReactRoot state={state} />);
        // }
        document.body.appendChild(floatingButton); // Re-attach floating button
      } else {
        // If level is 0, restore the original HTML
        document.body.innerHTML = state.originalHtml;
        document.body.appendChild(floatingButton); // Re-attach floating button
        // floatingButtonRoot.render(<ButtonComponent state={state} onLevelChange={handleLevelChange} />);
      }
    }
    // Initial content is the original page
    updateContent();
  },
});

// React component for custom content layout
export const ContentReactRoot = ({ state }: { state: State }) => {
  const [contentRootState, setContentRootState] = React.useState<any>(state);

  useEffect(() => {
    const url = state.url;

    const fetchSummaries = async () => {
      try {
        const multilevelSummaries = await fetchMultiLevelSummaries(url);
        console.log("Multilevel Summaries:", multilevelSummaries);
        state.multiLevelSummaries = multilevelSummaries;
        // setContentRootState({...state});

        const multilevelNotes = await fetchMultiLevelNotes(multilevelSummaries);
        console.log("Multilevel Notes:", multilevelNotes);
        state.multiLevelNotes = multilevelNotes;
        setContentRootState({ ...state });
      } catch (error) {
        console.error(error);
      }
    };
    if (
      Object.values(contentRootState.multiLevelSummaries).length === 0 ||
      Object.values(contentRootState.multiLevelNotes).length === 0
    )
      fetchSummaries();
  }, []);

  useEffect(() => {
    setContentRootState({ ...state });
  }, [state.level]);

  return (
    <div>
      <CustomLayout state={contentRootState} />
    </div>
  );
};

// State management class
export class State {
  public level;
  public mode;
  public originalHtml;
  public isLoggedIn;
  public url;
  public multiLevelSummaries;
  public multiLevelNotes;

  constructor() {
    this.level = 0; // Initial level is 0
    this.mode = "professional"; // Initial mode
    this.originalHtml = document.body.innerHTML; // Store the original HTML
    this.isLoggedIn = false;
    this.url = document.URL;
    this.multiLevelSummaries = {};
    this.multiLevelNotes = {};
  }
}
