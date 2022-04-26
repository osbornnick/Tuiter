import { UserList } from "../components/profile/user-list";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service";
import axios from "axios";
import { createUser } from "./services";
import Snippet from "../components/snippets/snippetInTuit";
import {findAllSnippets} from "../services/snippets-service";

const mock = jest.spyOn(axios, "get");

const MOCKED_SNIPPETS = [
    {
        "_id": "123",
        "code": "console.log('snippettest snippet code 1');",
        "author": "me",
        "created": "2022-04-19T02:41:24.588+00:00",
        "forkedFrom:": null
    },
    {
        "_id": "234",
        "code": "console.log('snippettest snippet code 2');",
        "author": "you",
        "created": "2022-04-19T02:41:24.588+00:00",
        "forkedFrom:": null
    },
];

test.only("user list renders static user array", () => {
    render(
        <HashRouter>
            <Snippet snippetId={MOCKED_SNIPPETS._id} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
});

test("user list renders mocked", async () => {
    axios.get.mockImplementation(() =>
                                     Promise.resolve({ data: { snippet: MOCKED_SNIPPETS } })
    );

    const response = await findAllSnippets();
    const snippets = response.snippet;

    const snippet = screen.getByText(/loading/i);
    expect(snippet).toBeInTheDocument();
});

test("user list renders async", async () => {
    mock.mockRestore();
    const users = await findAllSnippets();
    render(
        <HashRouter>
            <Snippet snippetId={MOCKED_SNIPPETS._id} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
});
