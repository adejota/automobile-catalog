import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/user'
import { Icon } from './Icon'

export function AppBar() {
  const location = useLocation()
  const dispatch = useDispatch()

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register'
  const isFormPage = location.pathname.includes('/form')
  let isAuthenticated = false

  const { user } = useSelector(state => state.user)

  if (user && user.accessToken) {
    isAuthenticated = true
  }

  return (
    <header className="w-full p-4 shadow-md">
      <div className='mx-auto max-w-[1320px] min-h-[40px] flex justify-between items-center'>
        <Link to="/">
          <img src="../../public/kavak.svg" alt="Kavak logo" className="max-w-[76px] md:max-w-[120px]" />
        </Link>

        {!isLoginOrRegisterPage ? 
          <div className="flex items-center">
            {!isFormPage && isAuthenticated ?
              <Link to="/form">
                <button type="button"
                  className="hidden lg:block bg-black-dark p-2 px-4 mr-4 rounded text-white"
                >
                  Novo anúncio
                </button>

                <button type="button"
                  className="block lg:hidden bg-white mr-4 p-2"
                >
                  <Icon name="Plus" className="w-6 h-6" />
                </button>
              </Link> : null
            }

            {!isAuthenticated ?
              <Link to="/register">
                <div className="flex items-center">
                  <Icon name="UserCircle" className="w-6 h-6 mr-2" />
                  <span>Cadastre-se</span>
                </div>
              </Link> : null
            }

            {isAuthenticated ? 
              <button onClick={ () => dispatch(logout()) }
                className="flex items-center"
              >
                <Icon name="ArrowRightOnRectangle" className="w-6 h-6 mr-2" />
                <span>Sair</span>
              </button> : null
            }
          </div> : null
        }
      </div>
    </header>
  )
}
