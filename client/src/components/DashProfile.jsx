import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from "react-redux"

const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser.username);

  return (
    <div className='w-full max-w-lg mx-auto mt-5 flex flex-col items-center'>
      <form className='flex flex-col gap-3 mt-5 w-full py-3 px-5'>
        <div className='mx-auto self-center mb-4 shadow-2xl w-32 h-32 rounded-full overflow-hidden'>
          <img src={currentUser.profilePicutre} alt="user profile" className='rounded-full border-4 w-full border-gray-500 cursor-pointer object-cover' />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput id="username" type="text" defaultValue={currentUser.username} required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" defaultValue={currentUser.email} required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" placeholder='********' required />
        </div>
        <Button type="submit" className=''>Update</Button>

        <div className='w-full flex justify-between'>
          <span>Delete account</span>
          <span>Sign out</span>
        </div>

      </form>
    </div>
  )
}

export default DashProfile