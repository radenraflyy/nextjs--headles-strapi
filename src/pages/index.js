import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { getAllAccounts, getSelectedAccount } from '@/api/services'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useEffect(() => {
    getSelectedAccount('raden.rafly')
  }, [])
  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <div className='flex flex-col items-center gap-2 w-full mb-12'>        
        <h3 className='text-2xl font-bold'>Name</h3>
        <p className='text-lg'>Description</p>
      </div>

      <div className='flex flex-col items-center gap-8 w-full'>
        <div
          className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
        >
          <p>Test Glasnadsa</p>
        </div>
      </div>
    </main>
  )
}
