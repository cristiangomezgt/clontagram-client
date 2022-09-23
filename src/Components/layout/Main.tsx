import React from 'react'

type Props = {
  children: JSX.Element,
  center?: boolean
}

const Main = (props: Props) => {
  let classes = `Main ${props.center ? 'Main--center' : ''}`
  return (
    <main className={classes}>{props.children}</main>
  )
}

export default Main