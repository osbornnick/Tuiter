import {
    findSnippetById,
    findSnippetsByUser,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    runSnippet,
} from "../services/snippets-service";

import { createUser, deleteUsersByUsername } from "../services/users-service";

describe("snippet services", () => {
    const ripley = {
        username: "ellenripley",
        password: "lv426",
        email: "ellenripley@aliens.com",
    };
    const anna = {
        username: "anna",
        password: "anananananan",
        email: "anna@anna.com",
    };

    let userId1;
    let userId2;
    beforeAll(async () => {
        // setup test snippets, etc
        const user1 = await createUser(ripley);
        userId1 = user1._id;
        const user2 = await createUser(anna);
        userId2 = user2._id;
    });

    afterAll(async () => {
        // teardown
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(anna.username);
    });

    test("createSnippet creates new snippet", () => {});
    test("updateSnippet updates snippet code", () => {});
    test("findSnippetsByUser gets all users snippets", () => {});
    test("findSnippetById returns correct snippet", () => {});
    test("deleteSnippet removes snippet from existence", () => {});
});
