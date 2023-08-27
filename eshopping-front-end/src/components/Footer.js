import React from 'react'

export default function Footer() {
  return (
    <footer className=' bg-white flex justify-center nav-text font-semibold shadow-md py-4 sh-t'>
       © {new Date().getFullYear()} Shop Nest. All rights reserved.
    </footer>
  )
}
