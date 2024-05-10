import { unwrapResult } from '@reduxjs/toolkit'
import { error } from 'console'
import { addPost, cancelEditingPost, editPost } from 'pages/blog/blog.slice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useDispatchThunk } from 'store'
import { Blog } from 'types/blog'

interface ErrorForm {
  publishDate: string
}

const initialPost: Blog = {
  id: '',
  title: '',
  description: '',
  featureImage: '',
  publishDate: '',
  isPublish: false
}

export default function CreatePost() {
  const [formData, setFormData] = useState<Blog>(initialPost)
  const [errorForm, setErrorForm] = useState<ErrorForm | null>(null)
  const editingPost = useSelector((state: RootState) => state.blog.editingPost)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useDispatchThunk()

  /**
   *
   * using unwrap | unwrapResult: dùng để lấy ra response của dispatch. Vì mặc định dispatch đã đóng gói data và trả về Redux
   *
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingPost) {
      dispatch(
        editPost({
          postId: editingPost?.id || '',
          post: formData
        })
      )
        .unwrap()
        .then(() => {
          setFormData(initialPost)
          if (errorForm) setErrorForm(null)
        })
        .catch((error) => {
          setErrorForm(error.error)
        })
    } else {
      try {
        const res = await dispatch(addPost(formData))
        unwrapResult(res)
        setFormData(initialPost)
      } catch (error) {}
    }
  }

  const handleCancelEditingPost = () => {
    dispatch(cancelEditingPost())
  }

  useEffect(() => {
    setFormData(editingPost || initialPost)
  }, [editingPost])

  return (
    <form onSubmit={handleSubmit} onReset={handleCancelEditingPost} className='grid grid-cols-2 items-center gap-2'>
      <div className='col-span-1'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className='col-span-1'>
        <label htmlFor='img_url' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Image Url
        </label>
        <input
          type='url'
          id='img_url'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='url image'
          required
          value={formData.featureImage}
          onChange={(e) => setFormData({ ...formData, featureImage: e.target.value })}
        />
      </div>
      <div className='col-span-1'>
        <label htmlFor='desc' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Description
        </label>
        <input
          type='text'
          id='desc'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Description'
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className='col-span-1'>
        <label htmlFor='publish_date' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publish_date'
          className={`block w-full rounded-lg border  ${!errorForm?.publishDate ? 'border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' : 'border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500'}`}
          required
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        />
        {errorForm?.publishDate && (
          <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
            <span className='font-medium'>Error: </span> {errorForm.publishDate}
          </p>
        )}
      </div>
      <div className='col-span-1 mb-6 flex h-12 items-center gap-2'>
        <input
          type='checkbox'
          id='isPublish'
          className='block h-4 w-4'
          checked={formData.isPublish}
          onChange={(e) => setFormData({ ...formData, isPublish: e.target.checked })}
        />
        <label htmlFor='isPublish' className='block text-sm font-medium text-gray-900 dark:text-white'>
          Publish
        </label>
      </div>
      <div className=''>
        {!editingPost && (
          <button
            type='submit'
            className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Publish Post
          </button>
        )}
        {editingPost && (
          <>
            <button
              type='submit'
              //   onClick={handleUpdatePost}
              className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Update Post
            </button>
            <button
              type='reset'
              className='mb-2 me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  )
}
