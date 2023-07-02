import Image from 'next/image'

export const metadata = {
  title: "Mobin Karam | Home",
}

export default function Home() {
  const time = (timeout) => {
    setTimeout((timeout) => {
      console.log(timeout + 10)
    }, timeout);
  }

  return (
    <div className='w-full h-screen bg-slate-400 flex items-center justify-center text-center'>
      <div className='bg-slate-700 p-10 rounded-xl cursor-pointer hover:bg-slate-50 hover:text-black transition-all duration-900'>Home</div>
      <div className=''>
        <div className=''>
          <span className=''></span>
        </div>
      </div>
    </div>
  )
}
