import React from "react";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { TbCategoryPlus, TbCategoryFilled } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { BsBorderStyle } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const AdminMenu = () => {

    return (
        <>
            <div className="text-center">
                <div className="list-group dashboard-menu">
                    <h4>Admin Panel</h4>
                    <NavLink
                        to="/dashboard/admin/profile"
                        className="list-group-item list-group-item-action"
                    >
                        <ImProfile />      Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action"
                    >
                        <TbCategoryPlus />     Create Category
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action"
                    >
                        <IoIosCreate />     Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="list-group-item list-group-item-action"
                    >
                        <TbCategoryFilled />      Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action"
                    >
                        <BsBorderStyle />      Orders
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action"
                    >
                        <AiOutlineUsergroupAdd />      Users
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;
