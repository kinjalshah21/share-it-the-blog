import React from 'react'
import blogService from '../appwrite/conf'
import {Link} from 'react-router-dom'

function PostCard({$id,title, featuredImageID}) {
    

    return (
        <Link to = {`/post/${$id}`}>
            <div className='w-full rounded-xl bg-gray-100 p-4'>
                <div className='w-full mb-4 justify-center'>
                    <img src={blogService.getFilePreview(featuredImageID)} alt={title}  className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard