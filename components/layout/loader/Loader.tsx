import { Spinner } from '@heroui/react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner color='default' label='loading'/>
    </div>
  )
}

export default Loader