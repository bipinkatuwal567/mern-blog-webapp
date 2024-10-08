import { Alert, Button, Modal, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment?.length > 200) {
            return;
        }

        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })
            const data = await res.json();

            if (res.ok) {
                setComment("");
                setCommentError(null);
                setComments([data, ...comments])
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate("/sign-in")
                return;
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: "PUT",
            })

            const data = await res.json()
            console.log(data);


            if (res.ok) {
                setComments((comments) =>
                    comments.map((comment) => comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.numberOfLikes,
                    } : comment)
                )
            }
        } catch (error) {
            console.log(error.message);

        }
    }

    const handleEdit = (comment, editedComment) => {
        setComments(comments => comments.map(c => c._id === comment._id ? {
            ...c,
            content: editedComment
        } : c))
    }

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate("/sign-in")
                return
            }

            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: "DELETE",
            })

            if (res.ok) {
                const data = await res.json();
                setComments(comments => comments.filter(comment => comment._id !== commentId))
            }
        } catch (error) {
            console.log(error.message);

        }
    }


    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`)
                const data = await res.json();
                if (res.ok) {
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);

            }
        }

        getComments();
    }, [postId])


    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <span>Signed in as : </span>
                    <img className="h-6 w-6 ml-2 rounded-full bg-cover" src={currentUser.profilePicture} alt={currentUser.username} />
                    <Link to={"/dashboard?tab=profile"}>
                        <span className="text-cyan-600 hover:underline">@{currentUser.username}</span>
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}

            {currentUser && (
                <div className="p-3 border rounded-lg border-cyan-600">
                    <form onSubmit={handleSubmit}>
                        <Textarea placeholder="Type your comment..." rows={3} maxLength={200} onChange={(e) => setComment(e.target.value)} value={comment} />
                        <div className="flex justify-between items-center w-full mt-5">
                            <span className="text-xs text-gray-500">{200 - comment.length} characters remaining</span>
                            <button>
                                <TbSquareRoundedArrowUpFilled className="h-10 w-10 text-cyan-500" />
                            </button>
                        </div>
                        {commentError && (
                            <Alert color={"failure"}>{commentError}</Alert>
                        )}
                    </form>
                </div>
            )}

            {comments && comments?.length === 0 ? (
                <p className="text-sm text-center my-8">No comments yet!</p>
            ) : (
                <>
                    <div className="my-8 flex gap-2 items-center">
                        <p>Comments: </p>
                        <div className="border px-2 rounded-md">{comments?.length}</div>
                    </div>

                    {
                        comments?.map(comment => {
                            return (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onLike={handleLike}
                                    onEdit={handleEdit}
                                    onDelete={(commentId) => {
                                        setShowModal(true)
                                        setCommentToDelete(commentId)
                                    }}
                                />

                            )
                        })
                    }
                </>
            )}

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={() => handleDelete(commentToDelete)}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CommentSection