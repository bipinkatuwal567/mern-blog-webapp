import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const DashPost = () => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`)
        const data = await res.json();

        if (res.ok) {
          console.log(data.posts);
          setPosts(data.posts)
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
    <div className="overflow-x-auto table-auto mx-auto w-full p-3 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                    <Link to={`/post/edit-post/${item._id}`} className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500">
                      Edit
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/delete-post/${item._id}`} className="font-medium text-red-600 hover:underline cursor-pointer dark:text-red-500">
                      Delete
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
            {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row> */}
          </Table.Body>
        </Table>
      ) : (
        <p>There is no any post</p>
      )}
    </div>
  )
}

export default DashPost