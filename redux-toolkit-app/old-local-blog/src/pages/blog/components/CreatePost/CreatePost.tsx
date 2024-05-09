import { addPost } from 'pages/blog/blog.reducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Blog } from 'types/blog'

const initialBlog: Blog = {
  id: '',
  title: '',
  description: '',
  featureImage: '',
  publishDate: '',
  isPublish: false
}

export default function CreatePost() {
  const [formData, setFormData] = useState<Blog>(initialBlog)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newFormData = { ...formData, id: new Date().toISOString() }
    dispatch(addPost(newFormData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-2/6 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='img_url' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Image Url
        </label>
        <input
          type='url'
          id='img_url'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-2/6 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='url image'
          required
          value={formData.featureImage}
          onChange={(e) => setFormData({ ...formData, featureImage: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='desc' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Description
        </label>
        <input
          type='text'
          id='desc'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-2/6 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Description'
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='publish_date' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publish_date'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-2/6 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          required
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        />
      </div>
      <div className='mb-6 flex h-12 items-center gap-2'>
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
        <button
          type='submit'
          className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Publish Post
        </button>
        <button
          type='button'
          className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
        >
          Update Post
        </button>
        <button
          type='button'
          className='mb-2 me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
