import React from "react";
import "./navigation.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as snippetService from "../../services/snippets-service";

function Navigation() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // console.log(location.pathname);
    const links = [
        { label: "Tuiter", icon: "fa-square-t", path: "/tuiter" },
        { label: "Home", icon: "fa-home", path: "/home" },
        { label: "Explore", icon: "fa-hashtag", path: "/explore" },
        { label: "My Snippets", icon: "fa-code", path: "/snippets" },
        { label: "Notifications", icon: "fa-bell", path: "/notifications" },
        { label: "Messages", icon: "fa-envelope", path: "/messages" },
        { label: "Bookmarks", icon: "fa-bookmark", path: "/bookmarks" },
        { label: "Lists", icon: "fa-list", path: "/lists" },
        { label: "Profile", icon: "fa-user", path: "/profile/mytuits" },
        { label: "More", icon: "fa-circle-ellipsis", path: "/more" },
        { label: "Login", icon: "fa-user", path: "/login" },
        { label: "Signup", icon: "fa-user", path: "/signup" },
    ];

    const handleNewSnippet = (evt) => {
        snippetService
            .createSnippet("me", {
                code: "Hello, world!",
            })
            .then((snippet) => navigate("/snippets"))
            .catch((err) => alert("you must be logged in to create a snippet"));
    };

    return (
        <div className="ttr-navigation">
            <ul className="list-group">
                {links.map((link, ndx) => {
                    return (
                        <li
                            key={ndx}
                            className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
         ${pathname.indexOf(link.path) >= 0 ? "fw-bold" : ""}`}
                        >
                            <Link
                                to={link.path}
                                id={link.label}
                                className="text-decoration-none text-black"
                            >
                                <i
                                    className={`fa ${link.icon} text-center`}
                                ></i>
                                <span className="ttr-label">{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <a
                href="#"
                className="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white"
            >
                Tuit
            </a>
            <button
                className="mt-2 btn btn-lg btn-info rounded-pill w-100 fw-bold text-white"
                onClick={handleNewSnippet}
            >
                Snippet
            </button>
        </div>
    );
}

export default Navigation;
