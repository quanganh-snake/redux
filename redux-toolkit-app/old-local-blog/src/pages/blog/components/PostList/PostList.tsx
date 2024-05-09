import PostItem from '../PostItem'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)

  console.log('🚀 ~ file: PostList.tsx:9 ~ PostList ~ postList:', postList)

  return (
    <section className='body-font text-gray-600'>
      <div className='container mx-auto px-5 py-24'>
        <div className='mb-20 flex w-full flex-wrap'>
          <div className='mb-6 w-full lg:mb-0 lg:w-1/2'>
            <h1 className='title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl'>
              Pitchfork Kickstarter Taxidermy
            </h1>
            <div className='h-1 w-20 rounded bg-indigo-500'></div>
          </div>
          <p className='w-full leading-relaxed text-gray-500 lg:w-1/2'>
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
            Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid
            celiac humblebrag.
          </p>
        </div>
        <div className='-m-4 flex flex-wrap'>
          {postList.map((post, indexedDB) => {
            return (
              <div key={post.id} className='p-4 md:w-1/2 xl:w-1/4'>
                <PostItem post={post} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
