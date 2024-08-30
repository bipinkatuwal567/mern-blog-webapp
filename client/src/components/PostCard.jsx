import { Button, Card } from 'flowbite-react'
import React from 'react'
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    console.log(post);

    return (
        <div className='relative border shadow-md w-full h-[410px] overflow-hidden rounded-lg sm:w-[350px] transition-all flex flex-col justify-between pb-3'>
            <div>
                <img src={post.image} className='h-[260px] w-full  object-cover bg-center p-4' alt="" />
                <div className='w-full px-4 py-2 flex flex-col'>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {post.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 italic text-sm mt-1">
                        {post.category}
                    </p>
                </div>
            </div>
            <div className='px-4'>
                <Link to={`/post/${post.slug}`}>
                    <Button gradientDuoTone={"cyanToBlue"} className='w-full'>Read Article
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PostCard