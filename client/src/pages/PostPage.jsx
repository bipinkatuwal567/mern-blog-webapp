import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostPage = () => {
    const { postSlug } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPost, setRecentPost] = useState(null)


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getpost?slug=${postSlug}`)
                const data = await res.json();

                if (res.ok) {
                    setPost(data.posts[0])
                    setLoading(false);
                    SetError(false);
                } else {
                    setLoading(false)
                    SetError(true)
                }

            } catch (error) {
                setLoading(false)
                SetError(true)
            }
        }

        fetchPost();
    }, [postSlug])

    useEffect(() => {
        const fetchRecentPost = async () => {
            try {
                const res = await fetch(`/api/post/getpost?limit=3`)
                const data = await res.json();

                if (res.ok) {
                    setRecentPost(data.posts)
                }

            } catch (error) {
                console.log(error.message);

            }
        }

        fetchRecentPost();
    }, [postSlug])



    if (loading) return (
        <div className='min-h-screen flex justify-center items-center'>
            <Spinner size={"xl"} />
        </div>
    )

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-center mt-10 text-3xl max-w-2xl mx-auto font-serif p-3 lg:text-4xl'>{post && post.title}</h1>
            <Link className='mt-5 self-center' to={`/search?category=${post && post.category}`}>
                <Button pill color={"gray"} size={"xs"}>{post && post.category}
                </Button>
            </Link>
            <img className='mt-10 p-3 max-h-[600px] w-full mx-auto object-cover' src={post && post.image} alt={post && post.title} />
            <div className='flex justify-between items-center italic text-xs max-w-2xl mx-auto w-full p-4 border-b border-slate-400'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post && (post.content.length / 1000).toFixed(0) == 0 ? `${1} min` : `${(post?.content.length / 1000).toFixed(0)} mins`} read</span>
            </div>

            <div className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && post.content }}>

            </div>

            <CommentSection postId={post?._id} />

            <div className='flex items-center w-full justify-center flex-col my-10'>
                <h2 className='text-xl font-semibold underline'>Recent Articles</h2>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentPost?.map(post => <PostCard key={post._id} post={post} />)
                    }
                </div>
            </div>
        </main >
    )
}

export default PostPage