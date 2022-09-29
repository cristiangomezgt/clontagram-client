import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='Loading'>
      <div className='Loading__dot-1'></div>
      <div className='Loading__dot-2'></div>
      <div className='Loading__dot-3'></div>
    </div>
  )
}

export default Loading