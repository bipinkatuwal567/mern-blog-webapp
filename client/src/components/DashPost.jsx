import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashPost = () => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null)



  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      const res = await fetch(`/api/post/getpost?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json();

      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
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
      const res = await fetch(`/api/post/deletepost/${postToDelete}/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        toast.success("Post has been deleted!")
        setPosts((prev) => prev.filter(item => item._id !== postToDelete))
      }
    } catch (error) {
      console.log(error.message);

    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`)
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts)

          if (data.posts.length <= 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);

      }
    }
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id])
  return (
    <div className="overflow-x-auto flex flex-col table-auto mx-auto w-full p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <ToastContainer />
      {currentUser.isAdmin && posts.length > 0 ? (
        <Table className='shadow-md rounded-lg'>
          <Table.Head>
            <Table.HeadCell>Post Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">

            {posts.map((item) => {
              return (
                <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link>
                      <img src={item.image} className='object-cover bg-center w-16 h-10' alt={item.slug} />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell className='capitalize'>{item.category}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${item._id}`} className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500">
                      Edit
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true)
                      setPostToDelete(item._id)
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
        <p>There is no any post</p>
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
                Are you sure you want to delete this post?
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

export default DashPost