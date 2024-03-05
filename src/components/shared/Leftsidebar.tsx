
import { useEffect } from 'react'
import { Link,NavLink, useNavigate, useLocation} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutation'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const Leftsidebar= () => {
    const {mutate: signOut, isSuccess}=useSignOutAccount()
    const navigate=useNavigate();
    const {user}=useUserContext()
    const {pathname}=useLocation()
    useEffect(()=>{
        if(isSuccess) navigate(0)
    },[isSuccess])

  return (
    <nav className="leftsidebar max-h-full">
        <div className="flex flex-col gap-11">
            <Link to="/" className="flex gap-3 items-center justify-center">
                <img src="assets/images/logo.png" width={38}/>
            </Link>
            <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                <img src={user.imageUrl || '(.)-(.)'} alt="profile" className='h-8 w-8 rounded-full' />
                <div className="flex flex-col">
                    <p className='body-bold'>
                        {user.name}
                    </p>
                    <p className='small-regular text-light-4'>@ {user.username}</p>
                </div>
            </Link>
            
            <ul className="flex flex-col gap-6">
                {sidebarLinks.map((link:INavLink)=>{
                    const isActive=pathname===link.route;
                    return (
                        <li key={link.label} className={`leftsidebar-link group ${
                            isActive && 'bg-primary-500'
                        
                        
                        }`}>
                            <NavLink to={link.route} className="flex gap-4 items-center p-4" >
                                <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${
                                    isActive && 'invert-white'
                                }`}/>
                                {link.label}
                            </NavLink>

                        </li>
                    )
                })}
            </ul>
        </div>
        <Button variant="ghost" className='shad-button_ghost' onClick={()=>{signOut()}}>
            <img src="assets/icons/logout.svg" alt="log out" />
            <p className='small-medium lg:base-medium'>Log out</p>
        </Button>
    </nav>
  )
}

export default Leftsidebar