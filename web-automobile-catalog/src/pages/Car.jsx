import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import api from "../lib/api"

export default function Car() {
  const { id } = useParams()
  const [car, setCar] = useState({})

  let isAuthenticated = false

  const { user } = useSelector(state => state.user)

  if (user && user.accessToken) {
    isAuthenticated = true
  }

  const formatNumber = (number) => {
    if (!number && number !== 0) return
    return number.toLocaleString('pt-br', {minimumFractionDigits: 0});
  }
  
  const formatPrice = (price) => {
    if (!price && price !== 0) return
    return parseFloat(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  useEffect(() => {
    const getCar = async (id) => {
      try {
        const res = await api.get(`/cars/${id}`)
        setCar(res.data)
      } catch (error) {
        console.log(error)        
      }
    }

    getCar(id)
  }, [])

  return (
    <div className='flex flex-col lg:flex-row p-4 mx-auto max-w-[1320px] min-h-screen'>
      <div className='w-full h-full'>
        <img src={car.image} alt={`Foto do carro ${car.brand} modelo ${car.name}`} 
          className="max-h-[65%] min-h-[65%] w-full rounded object-cover object-center"
        />
      </div>

      <div className='w-full h-full lg:px-4'>
        <div className="flex flex-col justify-between p-2 mb-4">
          <div>
            <p className="font-bold truncate">{car.brand} - {car.name} {car.model}</p>
            <p className="font-semibold text-sm text-gray">{car.year} • {formatNumber(car.kilometers)}</p>
          </div>
          <p className="font-semibold text-lg text-primary mt-2">{formatPrice(car.price)}</p>
        </div>
        
        <button type="button"
          className="block w-full bg-black-dark p-2 rounded text-white"
        >
          Tenho interesse
        </button>

        {isAuthenticated ?
          <Link to={`/form/${car.id}`}>
            <p className="text-center p-2">Editar anúncio</p>
          </Link> : null
        }
      </div>
    </div>
  )
}
