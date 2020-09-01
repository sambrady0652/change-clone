import React from 'react'
import { Menu, Box } from 'grommet'
import { useDispatch } from 'react-redux'

import { signOut } from '../store/users'

const AccountMenu = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(signOut())
  }
  return (
    <Menu
      size="small"
      icon={false}
      focusIndicator={false}
      hoverIndicator={{ color: "#ffffff" }}
      label="Account"
      items={[
        { label: 'Settings', onClick: () => { } },
        { label: 'Signout', onClick: () => handleClick() },
      ]}
    />
  )
}

export default AccountMenu