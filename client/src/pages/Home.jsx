import { Badge, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  const [posts, setPosts] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromURL = urlParams.get("searchTerm")
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL)
    } else {
      setSearchTerm("")
    }
  }, [location.search])


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getpost")
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts)

        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <div className='mx-auto h-[calc(100vh-4rem)] flex items-center justify-centers'>
        <div className='text-center p-4 mb-16 gap-5 max-w-3xl flex flex-col justify-center items-center'>
          <Badge className='px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 mx-auto'>Our blog</Badge>
          <h2 className='text-3xl lg:text-6xl tracking-tight font-bold'>
            Welcome to my Blog
          </h2>
          <p className=''>
            Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.
          </p>

          <form onSubmit={handleSubmit} className='mt-8'>
            <TextInput
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              type="text"
              className="w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: 8,
              }}
            />
          </form>

          {/* <Link to={"/search"}>
            <Button gradientDuoTone={"cyanToBlue"} pill className='mt-5'>View all posts</Button>
          </Link> */}
        </div>
      </div>

      <div className='flex justify-center w-full py-10'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col justify-center text-center'>
              <h3 className='md:text-2xl text-xl font-semibold'>Recent Posts</h3>
              <div className='flex flex-wrap py-10 justify-center gap-5'>
                {posts.map(post =>
                  <PostCard key={post._id} post={post} />
                )}
              </div>
              <Link to={"/search"} className='text-lg text-teal-400 hover:underline mx-auto'>
                View all posts
              </Link>
            </div>

          )
        }
      </div>
    </div>
  )
}

export default Home