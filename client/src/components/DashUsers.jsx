import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashUsers = () => {
    const [users, setUsers] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null)

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.user]);
                if (data.user.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message);

        }
    }

    const handleDeletePost = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`/api/user/delete-user/${userToDelete}`, {
                method: "DELETE"
            })
            const data = await res.json();
            console.log(data);
            

            if (res.ok) {
                setUsers((users) => users.filter(user => user._id !== userToDelete))
                toast.success("User has been deleted")
            }
        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/getusers`)
                const data = await res.json();


                if (res.ok) {
                    setUsers(data.users)

                    if (data.users.length <= 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message);

            }
        }
        if (currentUser.isAdmin) {
            fetchUser();
        }
    }, [currentUser._id])
    return (
        <div className="overflow-x-auto flex flex-col table-auto mx-auto w-full p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <ToastContainer />
            {currentUser.isAdmin && users.length > 0 ? (
                <Table className='shadow-md rounded-lg'>
                    <Table.Head>
                        <Table.HeadCell>User Created</Table.HeadCell>
                        <Table.HeadCell>Profile Picture</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">

                        {users.map((item) => {
                            return (
                                <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link>
                                            <img src={item.profilePicture} className='object-cover bg-center w-10 h-10 rounded-full' alt={item.username} />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{item.username}</Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell className='capitalize'>{item.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => {
                                            setShowModal(true)
                                            setUserToDelete(item._id)
                                        }} className="font-medium text-red-600 hover:underline cursor-pointer dark:text-red-500">
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
            ) : (
                <p>There is no any users</p>
            )}

            {
                showMore ? (
                    <Button onClick={handleShowMore} className='my-6 bg-teal-500 self-center'>Show more</Button>
                ) : null
            }

            {showModal ? (
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this user?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDeletePost}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setShowModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            ) : null}
        </div>
    )
}

export default DashUsers