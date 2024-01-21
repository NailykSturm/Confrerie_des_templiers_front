/// <reference types="vite/client" />

export const WIKI_DESC = (title: string) => {
    return `https://fr.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=extracts&exintro=1&explaintext=1`;
};
