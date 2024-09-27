const API_KEY = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

export async function fetchFullArticle(url: string) {
  const systemPrompt = `
  You are a content extraction and analysis model. Your task is to generate a full-length, detailed article based on the content of any given webpage. Use markdown formatting to enhance readability and structure. Follow these instructions carefully:

  1. **Identify Key Sections**: Break down the content into natural sections based on the structure of the webpage. These sections might include:
    - Introduction or Overview
    - Key Features or Details
    - Any specific breakdowns (e.g., subtopics, categories, or detailed lists)
    - Conclusions or Summary (if available)

  2. **Extract and Preserve All Details**: Capture every significant detail from the webpage without omitting any information. This includes:
    - Specific measurements, facts, figures, and data.
    - Names of people, organizations, and other key entities.
    - Events, dates, and important historical references.
    - Any relevant processes, descriptions, or technical details.

  3. **Do Not Summarize**: Each section should contain all available information. Avoid summarizing or condensing the content. Ensure every part of the original content is represented.

  4. **Maintain Logical Structure**: Present the extracted information in a well-organized manner that reads like a comprehensive article. Use markdown elements like headings, lists, and code blocks where appropriate.

  5. **Clarity and Completeness**: Ensure that the article is easy to understand, but do not omit technical or specialized terminology. Include definitions or explanations where necessary to maintain clarity.

  6. **Preserve Context**: Maintain the context of all information. For example, if the content discusses a process or timeline, ensure the sequence and reasoning are retained.

  Your goal is to transform the webpage content into a detailed, organized article using markdown formatting while retaining every important fact and detail, without summarizing or skipping over any information.
  `

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `url:\n\n${url}` }
      ],
      temperature: 0.2  // Adjusted temperature as in Python code
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export async function fetchMultiLevelSummaries(fullArticle: string) {  
  const originalWordCount = fullArticle.split(/\s+/).length;  // Count words in the full article

  // Define target word counts
  const targetCounts = {
    level1: Math.max(1, Math.floor(originalWordCount * 0.9)),
    level2: Math.max(1, Math.floor(originalWordCount * 0.6)),
    level3: Math.max(1, Math.floor(originalWordCount * 0.3)),
    level4: Math.max(1, Math.floor(originalWordCount * 0.15)),
    level5: Math.max(1, Math.floor(originalWordCount * 0.05)),
  };

  const summaryPrompt = `
  You are a content extractor and article writer. Your task is to represent the article in various levels with specific word counts. Ensure that you aim for the following approximate word counts for each level:
    - Level 1: Approximately ${targetCounts["level1"]} words.
    - Level 2: Approximately ${targetCounts["level2"]} words.
    - Level 3: Approximately ${targetCounts["level3"]} words.
    - Level 4: Approximately ${targetCounts["level4"]} words.
    - Level 5: Approximately ${targetCounts["level5"]} words.
    Please be explicit in your language and try to adhere closely to these word counts in your output. The output should be structured in the following JSON format:
    {{
        "1": "article representation for level 1 in markdown",
        "2": "article representation for level 2 in markdown",
        "3": "article representation for level 3 in markdown",
        "4": "article representation for level 4 in markdown",
        "5": "article representation for level 5 in markdown"
    }}
        NOTE: THE OUTPUT SHOULD BE JSON PARSABLE NO MATTER WHAT
    Here is the article:
  `

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: summaryPrompt },
        { role: "user", content: fullArticle }
      ],
      temperature: 0.1  // Adjusted temperature as in Python code
    })
  });

  const data = await response.json();
//   return data.choices[0].message.content.trim(); // JSON string
  return JSON.parse(data.choices[0].message.content.trim());
}

// // Example usage
// (async () => {
//   const url = 'https://en.wikipedia.org/wiki/Pluto';
//   const multiLevelSummaries = await fetchMultiLevelSummaries(url);
  
//   // Print the JSON output
//   console.log(multiLevelSummaries);
// })();

export async function fetchMultiLevelNotes(summaries: Record<string, string>) {

    const notesPrompt = `
    You are a study note generator. Your task is to create notes from the summaries provided. These notes should be concise and use markdown formatting in bullet points. It should be as succinct as possible while retaining the key points.
    The output should be in the following JSON format:
    {{
        "1": "Note for summary 1",
        "2": "Note for summary 2",
        "3": "Note for summary 3",
        "4": "Note for summary 4",
        "5": "Note for summary 5"
    }}
  
    Here are the summaries:
    `
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: "system", content: notesPrompt },
          { role: "user", content: JSON.stringify(summaries) }
        ],
        temperature: 0.1  // Adjusted temperature as in Python code
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content.trim());
  }


export async function generateKeywordSummaries(fullArticle: string) {

  const keywordsPrompt = `
   You are a keyword extraction and describing model. Your task is to identify key terms or phrases from the following article and provide a brief description for each. Please ensure to exclude any conclusions. We are expecting atmost 20 keywords. keep that in mind while extracting key terms or phrases. Only include general terms which are new or hot to the topic. Exclude extremely specific topics. For the section detailing key features, split each feature into its own entry. You don't need to add all the keywords as new entries. The output should be in JSON format with keywords as keys and their corresponding brief summaries as values. The outpust should strictly be a json and shouldn't contain any markdowns.
   Here is the article:
  `

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: keywordsPrompt },
        { role: "user", content: fullArticle }
      ],
      temperature: 0.1  // Adjusted temperature as in Python code
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content.trim());
}


