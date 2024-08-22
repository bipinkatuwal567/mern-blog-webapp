import React, { useEffect, useState } from 'react'
import moment from "moment"

const Comment = ({ comment }) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json();

                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);

            }
        }

        getUser()
    }, [comment._id])

    return (
        <div className='flex items-center gap-2 border-b dark:border-gray-600 px-2 py-5'>
            <div className='flex-shrink-0'>
                <img src={user.profilePicture} alt={user.username} className='h-10 w-10 rounded-full object-cover' />
            </div>

            <div className='flex-1 flex flex-col gap-1 text-sm'>
                <div className='flex gap-1 items-center'>
                    <span className='font-bold text-xs truncate'>{user ? `@${user.username}` : "Anynomous user"}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                <p className='text-gray-500'>{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment