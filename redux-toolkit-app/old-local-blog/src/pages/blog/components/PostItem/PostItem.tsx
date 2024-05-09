import { Blog } from 'types/blog'

interface IPostItemProps {
  post: Blog
}

export default function PostItem({ post }: IPostItemProps) {
  return (
    <div className='rounded-lg bg-gray-100 p-6'>
      <img className='mb-6 h-40 w-full rounded object-cover object-center' src={post.featureImage} alt={post.title} />
      <h3 className='title-font text-xs font-medium tracking-widest text-indigo-500'>{post.publishDate}</h3>
      <h2 className='title-font mb-4 text-lg font-medium text-gray-900'>{post.title}</h2>
      <p className='text-base leading-relaxed'>{post.description}</p>
      <div className='my-2 flex items-center justify-between'>
        <button className='rounded-lg border p-2'>Edit</button>
        <button className='rounded-lg border p-2'>Delete</button>
      </div>
    </div>
  )
}
