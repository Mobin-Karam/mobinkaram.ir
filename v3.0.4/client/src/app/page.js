import Image from 'next/image'

export const metadata = {
  title: "Mobin Karam | Home",
}
 
export default function Home() {
  const time = (timeout) => {
    setTimeout((timeout) = {
      console.log(timeout + 10)
    }, timeout);
  }
  return (
    <div className='w-full h-  bg-slate-400 f0 rounded-xl cursor-pointer hover:bg-slate-50lex items-center justify-center text-center'>
      <div className='bg-slate-700 p-1 hover:text-black transition-all duration-900'>Home</div>
      <div className=''>
        <div className=''>
          <span className=''></span>
        </div>
        <div className=''>
          <span className=''>
            <div className=''>
              <Image src='/images/mobin_karam.jpg'/>
              <div className='imgage align-content first-letter: ali'></div>
            </div>
          </span>
        </div>
        <div className=''>
          <div className=''>
            <span className='flex'>
              <div className='align-ce justify-content first-letter first-line'>
                <span className='flex align-center jus'></span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
