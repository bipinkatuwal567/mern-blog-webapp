import { Alert, Button, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase/firebase"
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice.js"

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { currentUser } = useSelector(state => state.user)
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [formData, setFormData] = useState({})


  const handleImageUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (image) {
      uploadImage()
    }
  }, [image])


  const uploadImage = async () => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image);

    setImageFileUploadError(null)
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImage(null);
        setImageUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        });
      }
    )
  }

  console.log(formData);


  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made")
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload')
      return;
    }

    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile has been updated")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }

  }



  return (
    <div className='w-full max-w-lg mx-auto mt-5 flex flex-col items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5 w-full py-3 px-5'>
        <input type="file" accept='image/*' onChange={handleImageUpload} ref={imageRef} hidden />
        <div className='relative mx-auto self-center mb-4 shadow-2xl w-32 h-32 rounded-full overflow-hidden' onClick={() => imageRef.current.click()}>
          <CircularProgressbar strokeWidth={4} value={imageFileUploadProgress || 0} text={imageFileUploadProgress && `${imageFileUploadProgress}%`} styles={{
            root: {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
            path: {
              stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                })`,
            }
          }} />
          <img src={imageUrl || currentUser.profilePicture} alt="user profile" className='rounded-full border-4 h-full w-full border-gray-500 cursor-pointer object-cover' />
        </div>
        {
          imageFileUploadError && <Alert color={"failure"}>{imageFileUploadError}</Alert>
        }
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput onChange={handleChange} id="username" type="text" defaultValue={currentUser.username} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput onChange={handleChange} id="email" type="email" defaultValue={currentUser.email} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput onChange={handleChange} id="password" type="password" placeholder='password' />
        </div>
        <Button type="submit" className=''>Update</Button>

        <div className='w-full flex justify-between'>
          <span>Delete account</span>
          <span>Sign out</span>
        </div>

        {updateUserSuccess && <Alert className='mt-5' color={"success"}>{updateUserSuccess}</Alert>}

        {updateUserError && <Alert className='mt-5' color={"failure"}>{updateUserError}</Alert>}

      </form>
    </div>
  )
}

export default DashProfile