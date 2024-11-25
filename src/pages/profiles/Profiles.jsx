import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

const Profiles = ({ token }) => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    const handleProfileClick = async (profile) => {
        if (profile.hasPin) {
            alert("This profile has a pin");
            return;
        }

        try {
            const profileResponse = await axios.post(
                "/api/a2srv-client/profiles/select",
                { id: profile.id },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const { token: newToken } = profileResponse.data;
            navigate("/homepage", {
                state: {
                    token: newToken,
                    profile: {
                        id: profile.id,
                        name: profile.name,
                        photo:
                            profile.id % 2 === 0
                                ? "/images/male1.png"
                                : "/images/male2.png",
                    },
                },
            });
        } catch (error) {
            console.error(error);
            alert("Profile login failed.");
        }
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const profileResponse = await axios.get(
                    "/api/a2srv-client/profiles",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                console.log(profileResponse.data);
                setProfiles(profileResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfiles();
    }, []);
    return (
        <div className="profiles">
            <img className="logo" src="/images/play-logo.png" alt="" />
            <h2 className="profile-header">
                Select the profile you want to login
            </h2>
            <ul className="profiles-list">
                {profiles.map((profile) => {
                    return (
                        <li
                            onClick={() => handleProfileClick(profile)}
                            className="profiles-item"
                            key={profile.id}
                        >
                            {profile.id % 2 == 0 ? (
                                <>
                                    <div>
                                        <img
                                            className="profile-img"
                                            src="/images/male1.png"
                                            alt=""
                                        />
                                    </div>
                                    <p className="profile-name">
                                        {profile.name}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <img
                                            className="profile-img"
                                            src="/images/male2.png"
                                            alt=""
                                        />
                                    </div>
                                    <p className="profile-name">
                                        {profile.name}
                                    </p>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
            <button className="profiles-logout">Log out</button>
        </div>
    );
};

export default Profiles;
