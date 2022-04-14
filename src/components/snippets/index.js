import React, { useState, useEffect } from "react";
import snippet_data from "./test_snippets.json";
import Snippet from "./snippet";

const Snippets = () => {
    return (
        <div className="container">
            {snippet_data.map((snip) => (
                <div className="row mb-4">
                    <Snippet snippet={snip} />
                </div>
            ))}
        </div>
    );
};
export default Snippets;
