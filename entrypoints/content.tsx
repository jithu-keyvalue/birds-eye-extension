import { createRoot } from "react-dom/client";
import ButtonComponent from "./content/ButtonComponent";
import React from "react";

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    const state = new State();

    // Create root elements for the floating button and the custom layout
    const floatingButton = document.createElement('div');
    const root = document.createElement('div');

    // Add root containers to the body
    document.body.appendChild(floatingButton);
    document.body.appendChild(root);

    // Render the floating button which will control the state
    createRoot(floatingButton).render(<ButtonComponent state={state} onLevelChange={handleLevelChange} />);

    // Function to handle level change (from button or other components)
    function handleLevelChange(newLevel: number) {
      state.level = newLevel;
      updateContent();
    }

    // Function to update the content based on the current level
    function updateContent() {
      if (state.level !== 0) {
        // If level is not 0, show custom content
        document.body.innerHTML = ''; // Clear the body
        document.body.appendChild(root); // Attach root element for React rendering
        createRoot(root).render(<ContentReactRoot state={state} />);
        document.body.appendChild(floatingButton); // Re-attach floating button
      } else {
        // If level is 0, restore the original HTML
        document.body.innerHTML = state.originalHtml;
        document.body.appendChild(floatingButton); // Re-attach floating button
      }
    }

    // Initial content is the original page
    updateContent();
  }
});

// React component for custom content layout
export const ContentReactRoot = ({ state }) => {
  return (
    <div>
      <h1>Custom Layout for {state.mode} Mode</h1>
      <p>Level: {state.level}</p>
      {/* Add more React components as needed */}
    </div>
  );
}

// State management class
export class State {
  public level;
  public mode;
  public originalHtml;

  constructor() {
    this.level = 0; // Initial level is 0
    this.mode = 'professional'; // Initial mode
    this.originalHtml = document.body.innerHTML; // Store the original HTML
  }
}
