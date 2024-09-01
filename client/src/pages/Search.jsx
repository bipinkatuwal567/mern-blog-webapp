import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [showMore, setShowMore] = useState(false);


    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSidebarData({
                ...sidebarData,
                searchTerm: e.target.value
            })
        }

        if (e.target.id === "sort") {
            const order = e.target.value || "desc"
            setSidebarData({
                ...sidebarData,
                sort: order
            })
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized"
            setSidebarData({
                ...sidebarData,
                category
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams(location.search)
        urlParams.set("searchTerm", sidebarData.searchTerm)
        urlParams.set("sort", sidebarData.sort)
        sidebarData.category !== "uncategorized" && urlParams.set("category", sidebarData.category)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;

        const urlParams = new URLSearchParams(location.search)
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getpost?${searchQuery}`)
        if (!res.ok) {
            return;
        }

        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true)
            } else {
                setShowMore(false)
            }
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get("searchTerm")
        const sortFromUrl = urlParams.get("sort")
        const categoryFromUrl = urlParams.get("category")


        if (searchTermFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
            })
        }

        if (sortFromUrl) {
            setSidebarData({
                ...sidebarData,
                sort: sortFromUrl
            })
        }

        if (categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                category: categoryFromUrl
            })
        }

        const fetchPosts = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            try {
                const res = await fetch(`/api/post/getpost?${searchQuery}`)
                const data = await res.json()

                if (!res.ok) {
                    setLoading(false)
                    return
                }

                setPosts(data.posts)
                setLoading(false)

                if (data.posts.length === 9) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            } catch (error) {
                console.log(error.message);

            }

        }
        fetchPosts()

    }, [location.search])
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex   items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id='category'
                        >
                            <option value='uncategorized'>Uncategorized</option>
                            <option value='programming'>Programming</option>
                            <option value='nature'>Nature</option>
                            <option value='politics'>Politics</option>
                            <option value='travel'>Travel</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        Apply Filters
                    </Button>
                </form>
            </div>

            <div className='p-6 w-full flex flex-col justify-center'>
                <h2 className='text-xl font-semibold'>Post results: </h2>
                {!loading && posts.length < 1 &&
                    <div className='flex flex-col gap-5 justify-center items-center mt-32'>
                        <h2 className='text-5xl'>🥹</h2>
                        <h2 className='text-4xl'>No any posts</h2>
                    </div>}
                <div className='flex flex-wrap gap-10 justify-center py-10'>
                    {
                        loading && posts.length > 1 ? (
                            <p>Loading...</p>
                        ) : (
                            posts.map(post => <PostCard post={post} key={post._id} />)
                        )
                    }
                </div>
                {
                    showMore && (
                        <button onClick={handleShowMore} className='text-teal-500 hover:underline'>Show more</button>
                    )
                }
            </div>
        </div>
    )
}

export default Search