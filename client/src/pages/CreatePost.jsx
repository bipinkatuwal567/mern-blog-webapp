import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Button, FileInput, Label, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase/firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({})


    const handleImageUpload = async () => {
        if (!image) {
            return setImageUploadError("No image found!")
        }


        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image);

        setImageUploadError(null)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageUploadProgress(null);
                setImage(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, image: downloadURL });
                    setImageUploadProgress(null);
                });
            }
        )

    }

    useEffect(() => {
        handleImageUpload();
    }, [image])
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h2 className='text-center text-2xl font-semibold my-7'>Create a post</h2>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-4 justify-between'>
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                    <Select>
                        <option value={"uncategorized"}>Select a category</option>
                        <option value={"programming"}>Programming</option>
                        <option value={"nature"}>Nature</option>
                        <option value={"travel"}>Travel</option>
                        <option value={"politics"}>Politics</option>
                    </Select>
                </div>
                <div className="flex w-full items-center justify-center">
                    <label htmlFor="image" className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                        <div className="flex flex-col items-center justify-center pb-6 pt-5 relative">
                            {
                                imageUploadProgress ? (
                                    <CircularProgressbar value={imageUploadProgress} className='abosolute h-8 w-8' />
                                ) : (
                                    <AiOutlineCloudUpload className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-300' />
                                )
                            }

                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> an image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FileInput id="image" className="hidden" onChange={(e) => setImage(e.target.files[0])} disabled={imageUploadProgress} />
                    </label>

                </div>
                {formData.image && <img src={formData.image} className='h-72 w-full object-cover rounded-md' />}
                <ReactQuill className='h-72 mb-12' theme="snow" required />
                <Button type='submit' gradientDuoTone={"cyanToBlue"}>Publish</Button>
            </form>
        </div>

    )
}

export default CreatePost