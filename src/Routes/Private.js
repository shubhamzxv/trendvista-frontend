import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import PageNotFound from "../pages/PageNotFound";

export default function Private() {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/user-auth`,
                {
                    headers:{
                        "Authorization": localStorage.getItem("token")
                    }
                }
            )
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (localStorage.getItem("token")) authCheck();
    }, []);

    return ok ? <Outlet /> : <PageNotFound />;
}