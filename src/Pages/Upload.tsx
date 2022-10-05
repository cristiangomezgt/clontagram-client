import React from 'react'
import Main from '../Components/layout/Main'

type Props = {
  showError: (message: string) => void
}

const Upload = (props: Props) => {
  return (
    <Main center><div>Upload</div></Main>
  )
}

export default Upload