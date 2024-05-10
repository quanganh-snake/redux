import { deletePost, getPostList, startEditingPost } from 'pages/blog/blog.slice'
import PostItem from '../PostItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useDispatchThunk } from 'store'
import { useEffect } from 'react'
import SkeletonPost from '../SkeletonPost'
import { useGetPostListQuery } from 'pages/blog/blog.service'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)

  const dispatch = useDispatchThunk()

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleStartEditingPost = (postId: string) => {
    dispatch(startEditingPost(postId))
  }

  // using dispatch getPostList

  //   useEffect(() => {
  //     const promise = dispatch(getPostList())

  //     return () => {
  //       // Cancel call API when component unmount
  //       promise.abort()
  //     }
  //   }, [dispatch])

  // using RTK Query
  // isLoading: chỉ dành cho lần fetch đầu tiên
  // isFetching là cho mỗi lần gọi API
  const { data: postListRTK, isLoading, isFetching } = useGetPostListQuery()

  console.log('🚀 ~ file: PostList.tsx:37 ~ PostList ~ postListRTK:', postListRTK)

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
          {isFetching && (
            <>
              <SkeletonPost />
              <SkeletonPost />
            </>
          )}
          {!isFetching &&
            postListRTK?.map((post, indexedDB) => {
              return (
                <div key={post.id} className='w-1/2 p-4 xl:w-1/4'>
                  <PostItem post={post} onDeletePost={handleDeletePost} onStartEditingPost={handleStartEditingPost} />
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
