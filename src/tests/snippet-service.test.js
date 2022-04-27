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

    let userId1;
    beforeAll(async () => {
        // setup test snippets, etc
        const user1 = await createUser(ripley);
        userId1 = user1._id;
    });

    afterAll(async () => {
        // teardown
        await deleteUsersByUsername(ripley.username);
    });

    const snippet = {
        code: "console.log('hello, world!')",
        title: "testSnippet",
    };

    let snippetId;

    test("createSnippet creates new snippet", async () => {
        const { _id } = await createSnippet(userId1, snippet);
        snippetId = _id;
        const snip = await findSnippetById(snippetId);
        expect(snip.code).toBe(snippet.code);
        expect(snip.title).toBe(snippet.title);
        expect(snip.author).toBe(userId1);
    });
    test("updateSnippet updates snippet code and title", async () => {
        await updateSnippet(snippetId, { title: "new title" });
        let newSnip = await findSnippetById(snippetId);
        expect(newSnip.code).toBe(snippet.code);
        expect(newSnip.title).toBe("new title");

        await updateSnippet(snippetId, {
            code: "const a = 2; console.log(a);",
        });
        newSnip = await findSnippetById(snippetId);
        expect(newSnip.code).toBe("const a = 2; console.log(a);");
        expect(newSnip.title).toBe("new title");
    });
    test("findSnippetsByUser gets all users snippets", async () => {
        const snippets = await findSnippetsByUser(userId1);
        expect(snippets.length).toBe(1);
        expect(snippets[0].code).toBe("const a = 2; console.log(a);");
        expect(snippets[0].title).toBe("new title");
    });
    test("findSnippetById returns correct snippet", () => {
        return findSnippetById(snippetId).then((snip) => {
            expect(snip.code).toBe("const a = 2; console.log(a);");
            expect(snip._id).toBe(snippetId);
            expect(snip.title).toBe("new title");
            expect(snip.author).toBe(userId1);
        });
    });
    test("can run snippet", () => {
        return runSnippet(snippet).then((res) => {
            expect(res.stdout).toBe("hello, world!\n");
            expect(res.status.id).toBe(3);
        });
    });
    test("deleteSnippet removes snippet from existence", async () => {
        await deleteSnippet(snippetId);
        return findSnippetById(snippetId).then((res) => expect(res).toBeNull());
    });
});
