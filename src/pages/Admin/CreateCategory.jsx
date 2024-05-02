import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
// import { toast } from 'react-toastify';
import { Modal } from "antd";
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import CategoryForm from '../../components/Forms/CategoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {
                name,
            },
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
            setName('');
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong in input form");
        }
    };

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`)
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);


    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
                { name: updatedName },
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    return (
        <Layout>
            <div className="container-fluid p-4 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2>Manage Category</h2>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="card w-75 p-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        handleDelete(c._id);
                                                    }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory