import {Outlet, Navigate} from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ): (
        <>

          <section className="max-h-screen max-w-5xl w-full items-center justify-center gap-5 px-14 flex flex-1 flex-col ">
            <Outlet />
          </section>

          <img 
            src='\assets\images\sideVid.mp4' 
            alt='video'
            className='hidden xl:block w-1/2 object-cover bg-no-repeat' 
          />
        </>
      )}
    </>
  )
}

export default AuthLayout