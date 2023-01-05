import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { register, login } from '../store/user'

export default function Register() {
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    if (user && user.accessToken) {
      navigate('/')
    }
  }, [])

  const handleError = (error) => {
    if (error.username) {
      setUsernameError(error.username[0])
    }

    if (error.email) {
      setEmailError(error.email[0])
    }

    if (error.password) {
      setPasswordError(error.password[0])
    }

    if (error.detail) {
      setUsernameError(error.detail)
    }
  }

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    }

    if (event.target.name === 'email') {
      setEmail(event.target.value)
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const res = await dispatch(register({ username, email, password }))
    if (res.error) {
      handleError(res.error.response.data)
    }

    if (res.data.id) {
      const loginRes = await dispatch(login({username, password}))
      if (loginRes.data.access) {
        navigate('/')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="min-h-screen lg:grid lg:grid-cols-6 min-h-screen"
    >
      <div className="w-full h-full col-span-2 hidden lg:block">
        <img src="/showroom.jpg" alt="" className="w-full h-full object-cover object-center" />
      </div>
      
      <div className="p-8 mx-auto lg:w-2/3 max-w-[520px] col-span-4">
        <h1 className="font-semibold text-xl mb-4">Criar conta</h1>

        <div className="mb-4">
          <label htmlFor="username">Nome de usuário</label>
          <input type="text"
            name="username"
            className="w-full rounded-l p-2 mt-1 border border-gray focus:outline-none focus:border-primary"
            onChange={handleInputChange}
            required
            onFocus={() => usernameError ? setUsernameError('') : null}
          />
          { usernameError ? <p className="text-error text-sm">{ usernameError }</p> : null}
        </div>

        <div className="mb-4">
          <label htmlFor="email">E-mail</label>
          <input type="text"
            name="email"
            className="w-full rounded-l p-2 mt-1 border border-gray focus:outline-none focus:border-primary"
            onChange={handleInputChange}
            required
            onFocus={() => emailError ? setEmailError('') : null}
          />
          { emailError ? <p className="text-error text-sm">{ emailError }</p> : null}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <input type="password"
            name="password"
            className="w-full rounded-l p-2 mt-1 border border-gray focus:outline-none focus:border-primary"
            onChange={handleInputChange}
            required
            onFocus={() => passwordError ? setPasswordError('') : null}
          />
          { passwordError ? <p className="text-error text-sm">{ passwordError }</p> : null}
        </div>

        <button type="submit"
          className="block w-full bg-black-dark p-2 mt-8 rounded text-white"
        >
          Criar conta
        </button>

        <Link to="/login">
          <p className="text-center p-2">Iniciar sessão</p>
        </Link>
      </div>
    </form>
  )
}
