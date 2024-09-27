# README

## Initializing
0. ```nvm install 20``` and ```nvm use 20```

1. ```npm i``` to install the required packages.

2. ```npm run dev``` to open a chrome browser with the extension already enabled.
3. visit any webpage (having the structure \*://\*.\*), and the button appears at the bottom


## Working
- the code resides in the `entrypoints` folder. It contains:
    - `popup` folder: This is a react app that provides the layout for everything in the pop that's shown when we click on the extension in the extension bar. 

    - `content.tsx` and `content` folder: This is where the modifications to the current page can be made. There's an option to define which set of urls would be modified. This is where the code for injecting our output goes (i assume)

    - `background.ts`: Used to define background activities running when the extension is enabled. Don't know if we have to use it (might be used if we're directly calling the OpenAI api without going through the backend).

-   The extension icon displayed on the top bar lies in `public/icon/`.

