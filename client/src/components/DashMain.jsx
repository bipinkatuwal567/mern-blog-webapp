import React, { useEffect, useState } from 'react'
import { LiaUserSolid } from "react-icons/lia";
import { IoMdArrowUp } from "react-icons/io";
import { HiOutlineDocument } from "react-icons/hi";

const DashMain = () => {
    const [users, setUsers] = useState(null)
    const [posts, setPosts] = useState(null)
    const [totalUsers, setTotalUsers] = useState(null)
    const [totalPosts, setTotalPosts] = useState(null)
    const [lastMonthUsers, setLastMonthUsers] = useState(null)
    const [lastMonthPosts, setLastMonthPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getpost`)
                const data = await res.json();

                if (res.ok) {
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthPosts)
                }

            } catch (error) {
                console.log(error.message);

            }
        }

        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user/getusers")
                const data = await res.json()

                if (res.ok) {
                    setTotalUsers(data.totalUsers)

                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message);

            }
        }

        fetchPosts();
        fetchUsers();
    }, [])

    return (
        <div className='p-4 w-full mt-5 flex gap-5 justify-between max-w-3xl mx-auto h-[14rem]'>
            <div className='w-1/2 bg-gray-50 text-black rounded-lg p-5 shadow-md'>
                <LiaUserSolid className='h-12 w-12 bg-cyan-400 text-white rounded-xl p-2 shadow-lg' />
                <div className='mt-2'>
                    <h2 className='text-xl font-semibold'>Total Users</h2>
                    <p className='text-xl font-semibold'>{totalUsers}</p>
                </div>
                <div className='mt-3 flex gap-2 items-center'>
                    <p>Last month</p>
                    <p className='text-green-500 flex items-center gap-1'>{lastMonthUsers} <IoMdArrowUp className='font-semibold' /></p>
                </div>
            </div>
            <div className='w-1/2 bg-gray-50 text-black rounded-lg p-5 shadow-md'>
                <HiOutlineDocument className='h-12 w-12 bg-orange-400 text-white rounded-xl p-2 shadow-lg' />
                <div className='mt-2'>
                    <h2 className='text-xl font-semibold'>Total Posts</h2>
                    <p className='text-xl font-semibold'>{totalPosts}</p>
                </div>
                <div className='mt-3 flex gap-2 items-center'>
                    <p>Last month</p>
                    <p className='flex items-center gap-1 text-green-500'>{lastMonthPosts} <IoMdArrowUp className=' font-semibold' /></p>
                </div>
            </div>
        </div>
    )
}

export default DashMain