import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";
const Navbar = ({
    tabBarData,
    profile,
    fetchMovies,
    handleCategoryScreenToggle,
}) => {
    if (!tabBarData) {
        return <nav className="navbar">Loading...</nav>;
    }

    const onMoviesClick = async (id) => {
        try {
            if (id === 1) {
                handleCategoryScreenToggle(true);
            } else {
                handleCategoryScreenToggle(false);
            }
            const movieData = await fetchMovies(id);
            console.log("Fetched Movie Data:", movieData);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-center">
                <img
                    className="navbar-logo"
                    src="/images/play-logo.png"
                    alt=""
                />
                <ul className="navbar-menu">
                    {tabBarData.map((tabBar) => {
                        return (
                            <li
                                className="navbar-list"
                                key={tabBar.id}
                                onClick={() => {
                                    if (tabBar.id === 1) {
                                        onMoviesClick(tabBar.id);
                                    }
                                }}
                            >
                                {tabBar.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="navbar-right">
                <FaSearch className="navbar-search" />
                <p className="navbar-profile-name">{profile.name}</p>
                <img className="navbar-avatar" src={profile.photo} alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
