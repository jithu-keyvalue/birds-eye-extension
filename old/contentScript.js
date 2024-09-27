// contentScript.js
let currentLevel = 0; // Start at level 0
const maxLevel = 10; // Maximum level is now 10
const originalHTML = document.documentElement.innerHTML; // Save original HTML to restore later
const originalPageText = document.body.innerText; // Save original page content to use for all summaries
const pageTitle = document.title; // Use page title as the heading for each level

// Background colors for each level from very light green to moderately dark pastel green
const bgColors = [
  '#E6FFE6', '#D9FFD9', '#CCFFCC', '#BFFFBF', '#B2FFB2', '#A6FFA6', '#99FF99', '#8CFF8C', '#80FF80', '#73FF73'
];

const apiUrl = 'https://api.openai.com/v1/chat/completions';
let apiCallInProgress = false; // Flag to track if an API call is in progress

// Cache to store the generated HTML for each level
const cache = {};

// Level-specific prompts
const prompts = [
  null, // Placeholder for level 0 (original page)
  "Provide a detailed summary of this content.",
  "Summarize the content with most details, but remove some unnecessary information.",
  "Provide a summary with moderate details, focusing on the key points.",
  "Provide a mid-level summary of this content, reducing verbosity.",
  "Provide a summary that captures the essential information in fewer sentences.",
  "Give a high-level overview that captures the most important points.",
  "Summarize the content in a concise manner, focusing on high-level themes.",
  "Provide a brief overview with minimal details, focusing only on key ideas.",
  "Give a very brief, high-level summary with minimal details.",
  "Provide a one-line, abstract summary with the bare minimum of information."
];

// Set a base max_tokens value to vary the detail for each level
const maxTokensBase = 1000; // The base token count for the most detailed level (level 1)

// Function to make the OpenAI API request using the API_KEY from window object
async function fetchSummary(prompt, maxTokens) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.API_KEY}` // Use the API key from window
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: maxTokens
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Function to summarize content at different levels
async function showSummary(level) {
  console.log(`Displaying summary for level ${level}`); // Log current summary level
  
  if (apiCallInProgress) return; // Prevent new calls if one is in progress
  apiCallInProgress = true; // Set the flag to indicate an API call is ongoing

  // Check if the summary for the current level is cached
  if (cache[level]) {
    console.log(`Loading cached summary for level ${level}`); // Log when using cached content
    // If cached, just load it
    document.documentElement.innerHTML = cache[level];
    document.body.style.backgroundColor = bgColors[level - 1]; // Apply the corresponding background color
    apiCallInProgress = false; // Reset the flag
    return;
  }

  let summaryText = '';

  // Use the original page text for all levels
  let prompt = `${prompts[level]}\n\n${originalPageText}`;

  // Adjust the max tokens dynamically based on the level
  let maxTokens = Math.floor(maxTokensBase * ((11 - level) / 10)); // More tokens for lower levels, fewer for higher levels

  try {
    // Fetch the summary from OpenAI API
    summaryText = await fetchSummary(prompt, maxTokens);

    // Build the new HTML for this level with the summary level indicated in the main heading
    let newHtml = `
      <html>
        <head>
          <title>${pageTitle}</title>
        </head>
        <body>
          <div style="margin:20px;">
            <h1>${pageTitle} (summary level - ${level})</h1>
            <p>${summaryText}</p>
          </div>
        </body>
      </html>`;
    
    // Cache the generated HTML for this level
    cache[level] = newHtml;

    console.log(`Summary for level ${level} generated and cached`); // Log after generating summary

    // Replace the page content with the cached summary
    document.documentElement.innerHTML = newHtml;
    document.body.style.backgroundColor = bgColors[level - 1]; // Apply the corresponding background color
  } catch (error) {
    console.error(`Error fetching summary for level ${level}:`, error); // Log errors
  } finally {
    apiCallInProgress = false; // Reset the flag once the API call is completed
  }
}

document.addEventListener('wheel', async (event) => {
  // Check if Shift key is pressed during scroll
  if (event.shiftKey) {
    // Determine scroll direction
    if (event.deltaY < 0 && currentLevel > 0) {
      currentLevel--;
    } else if (event.deltaY > 0 && currentLevel < maxLevel) {
      currentLevel++;
    }

    console.log(`Current level after scroll: ${currentLevel}`); // Log the current level after scroll

    // Apply background color for the current level
    document.body.style.backgroundColor = bgColors[currentLevel - 1];

    // Handle different levels
    if (currentLevel === 0) {
      console.log("Restoring original page content"); // Log restoring original page content
      // Restore the original page content
      document.documentElement.innerHTML = originalHTML;
    } else {
      // Show summary based on the current level (1 to 10)
      await showSummary(currentLevel);
    }
  }
});
