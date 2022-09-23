import React from 'react'

type Props = {}

const Nav = (props: Props) => {
  return (
    <nav className='Nav'>
      <ul className='Nav__links'>
        <li>
          <a href="/" className='Nav__link'>
            Clontagram
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav