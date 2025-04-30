"use client"
import Breadcrumb from '@/components/layout/breadcrumb/Breadcrumb';
import AppSiderbar from '@/components/layout/sidebar/AppSidebar';
import usePageTitle from '@/hooks/usePageTitle';
import React from 'react'

function AppLayout({children}: { children: React.ReactNode }) {
  const {title, breadcrumbs} = usePageTitle();
  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10'>
      <div className='col-span-1 md:col-span-4 lg:col-span-3 xl:col-span-4'>
        <AppSiderbar/>
      </div>

      <div className='col-span-1 md:col-span-8 lg:col-span-9 xl:col-span-3'>
        <Breadcrumb title={title} breadcrumbs={breadcrumbs}/>
        <div className='mt-5'> {children} </div>
      </div>
    </div>
  )
}

export default AppLayout;