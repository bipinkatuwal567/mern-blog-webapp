import React, { useEffect, useState } from 'react'
import moment from "moment"
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

const Comment = ({ comment, onLike, onEdit }) => {
    const { currentUser } = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const [editedComment, setEditedComment] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(true)
        setEditedComment(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedComment
                })
            })

            if (res.ok) {
                setIsEdit(false)
                onEdit(comment, editedComment)
            }

        } catch (error) {
            console.log(error.message);

        }
    }

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
                {
                    isEdit ? (
                        <div className='flex flex-col gap-3'>
                            <Textarea id="comment"
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                                required />
                            <div className='flex self-end gap-2'>
                                <Button size={"sm"} gradientDuoTone={"cyanToBlue"} onClick={handleSave}>Save</Button>
                                <Button size={"sm"} gradientDuoTone={"cyanToBlue"} outline onClick={() => setIsEdit(false)}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className='text-gray-500'>{comment.content}</p>

                            <div className='flex items-center text-xs gap-2 pt-2'>
                                <button onClick={() => onLike(comment._id)}>
                                    <AiFillLike className={`w-4 h-4 hover:text-blue-500 text-gray-500 ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"}`} />
                                </button>
                                <p>{`${comment.numberOfLikes} ${comment.numberOfLikes === 1 || comment.numberOfLikes === 0 ? "Like" : "Likes"}`}</p>

                                <span className='cursor-pointer hover:text-blue-500' onClick={handleEdit}>Edit</span>
                            </div></>
                    )
                }
            </div>
        </div>
    )
}

export default Comment