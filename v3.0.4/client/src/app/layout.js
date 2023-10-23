import '../dist/main.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] }) 

export const metadata = {
  title: 'Mobin Karam',     
  description: 'Mobin Karam Portfolio Website',
  metadata:'Mobin karam Portfolio Website',
  titles: 'kjai'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className=''></div>
        </div>
      </body>
    </html>
  )
}
