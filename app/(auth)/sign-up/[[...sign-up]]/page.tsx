import {  SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
      <div className="w-full max-w-lg">
        <SignUp />
      </div>
    </div>
  )
}
