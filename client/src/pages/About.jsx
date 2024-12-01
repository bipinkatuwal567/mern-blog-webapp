import React from 'react'

const About = () => {
  return (
    <div className='h-[calc(100vh-4rem)] flex justify-center items-center p-4'>
      <div className='flex flex-col items-center mx-auto max-w-2xl sm:text-center text-left gap-10 text-gray-900 dark:text-gray-400'>
        <h2 className='text-3xl font-semibold dark:text-gray-50'>About Forest's blog</h2>
        <p>
          Welcome to Forest's Blog! This blog was created by Bipin Katuwal as a personal project to share his thoughts and ideas with the world. Bipin is a passionate developer who loves to write about technology, coding, and everything in between.
        </p>
        <p>
          At Forest's Blog, we believe in embracing the diversity of ideas and the beauty of exploration. Whether it's uncovering the secrets of lush green forests, diving into the latest technological trends, or sharing personal journeys, our blog offers a little something for everyone.
        </p>
        <p>
          We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of learners can help each other grow and improve.
        </p>
      </div>
    </div>
  )
}

export default About