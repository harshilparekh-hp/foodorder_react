import React from 'react'
import { withAdminAuth } from '../HOC'

function AuthenticationTestAdmin() {
  return (
    <div>this page can be accessed if role of logged in user is ADMIN</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);