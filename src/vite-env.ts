/// <reference types="vite/client" />

export const VITE_WIKI_DESC = (title: string) => {
    return `https://fr.wikipedia.org/w/api.php?action=query&format=json&titles=${title}=extracts&exintro=1&explaintext=1`;
};
