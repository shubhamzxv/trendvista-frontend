import React from 'react'
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { BsBorderStyle } from "react-icons/bs";

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group dashboard-menu">
                    <h4>User Panel</h4>
                    <NavLink
                        to="/dashboard/user/profile"
                        className="list-group-item list-group-item-action"
                    >
                        <ImProfile />       Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/orders"
                        className="list-group-item list-group-item-action"
                    >
                        <BsBorderStyle />      Order History
                    </NavLink>

                </div>
            </div>
        </>
    )
}

export default UserMenu