import React, { useState, useEffect } from "react";
import Snippet from "./snippet";
import { useLocation } from "react-router-dom";
import { findSnippetsByUser } from "../../services/snippets-service";

const Snippets = () => {
    const [loading, setLoading] = useState(true);
    const [mySnippets, setMySnippets] = useState([]);
    const [authorized, setAuthorized] = useState(true);
    const location = useLocation();
    useEffect(() => {
        findSnippetsByUser("me")
            .then((response) => {
                setMySnippets(response);
                setLoading(false);
            })
            .catch((res) => {
                setAuthorized(false);
                setLoading(false);
            });
    }, [location.key]);
    if (loading)
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    if (!authorized)
        return (
            <div className="d-flex justify-content-center">
                <h3>Login to view and make snippets</h3>
            </div>
        );
    return (
        <div className="container">
            {mySnippets.map((snip) => (
                <div className="row mb-4">
                    <Snippet snippet={snip} />
                </div>
            ))}
        </div>
    );
};
export default Snippets;
