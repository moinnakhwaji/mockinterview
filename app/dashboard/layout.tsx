import Header from '@/components/shared/Header'
import React from 'react'

const layout = ({children}:any) => {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default layout