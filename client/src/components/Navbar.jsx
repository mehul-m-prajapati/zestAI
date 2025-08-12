import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {UserButton, useClerk, useUser} from'@clerk/clerk-react'


function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  {/* if user is login then will show user profile else will show login/getstarted */}
  return (
    <div className='fixed z-5 w-full backdrop:backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px20 xl:px-32'>
        <img src={assets.logo} alt="" className='w-15 sm:w-20 cursor-pointer' onClick={() => navigate('/')} />
        {
            user ? <UserButton /> :
            (
                <button onClick={openSignIn}
                    className='flex items-center gap-2 rounded-full text-sm bg-primary cursor-pointer
                    text-white px-4 py-2.5'
                >Login<ArrowRight className='w-4 h-4' /></button>
            )
        }
    </div>
  )
}

export default Navbar
