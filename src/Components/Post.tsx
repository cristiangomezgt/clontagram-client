import React from 'react'
import { IPost } from '../Types/post.type'
import Avatar from './Avatar'

type Props = {
  post: IPost
}

const Post = (props: Props) => {
  return (
    <div className='Post-Componente'>
      <Avatar user={props.post.usuario!} />
      <img src={props.post.url} alt={props.post.caption} className="Post-Componente__img" />
    </div>
  )
}

export default Post;