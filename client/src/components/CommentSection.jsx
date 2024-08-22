import { Alert, Button, Textarea } from "flowbite-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 200) {
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
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }

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
        </div>
    )
}

export default CommentSection