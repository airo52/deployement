import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://softonica.buzz" target="_blank" rel="noopener noreferrer">Writer</a>
        <span className="ml-1">&copy; 2020 softonica.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">Writer</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
