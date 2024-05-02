import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PageNotFound from "../pages/PageNotFound";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/admin-auth`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            )
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        catch(error){
            console.error('User is Not Admin')
        }
        };
        if (localStorage.getItem("token")) authCheck();
    }, []);

    return ok ? <Outlet /> : <PageNotFound />;
}