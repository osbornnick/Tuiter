import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SNIPPETS_API = `${BASE_URL}/api/snippets`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true,
});

export const findAllSnippets = () =>
    api.get(SNIPPETS_API).then((response) => response.data);

export const findSnippetById = (sid) =>
    api.get(`${SNIPPETS_API}/${sid}`).then((response) => response.data);

export const findSnippetsByUser = (uid) =>
    api
        .get(`${USERS_API}/${uid}/snippets`)
        .then((response) => response.data)
        .catch((err) => {
            console.log(err);
            return [];
        });

export const createSnippet = (uid, snippet) =>
    api
        .post(`${USERS_API}/${uid}/snippets`, snippet)
        .then((response) => response.data);

export const updateSnippet = (sid, snippet) =>
    api.post(`${SNIPPETS_API}/${sid}`, snippet).then((response) => response.data);

export const deleteSnippet = (sid) =>
    api.delete(`${SNIPPETS_API}/${sid}`).then((response) => response.data);