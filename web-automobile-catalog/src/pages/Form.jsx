import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import api from "../lib/api"
import { Icon } from "../components/Icon"

export default function Form() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    kilometers: '',
    price: '',
    imageName: '',
  })

  const fields = [
    { name: "name", type: 'text', label: 'Nome' },
    { name: "brand", type: 'text', label: 'Marca'},
    { name: "model", type: 'text', label: 'Modelo'},
    { name: "year", type: 'number', label: 'Ano'},
    { name: "kilometers", type: 'number', label: 'Quilômetros rodados'},
    { name: "price", type: 'number', label: 'Preço'},
  ]

  useEffect(() => {
    const getCar = async (id) => {
      try {
        const res = await api.get(`/cars/${id}`)
        setCar({
          ...res.data,
          imageName: res.data.image.split('/').at(-1)
        })
      } catch (error) {
        console.log(error)        
      }
    }

    if (!user) {
      return navigate('/')
    }

    if (id) getCar(id)
  }, [])

  const getImageFromUrl = async (url) => {
    const config = { responseType: 'blob' }
    const fileName = url.split('/').at(-1)
    const res = await api.get(url, config)
    return new File([res.data], fileName)
  }

  const handleInputChange = (event) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value
    })
  }

  const handleFileInputChange = (event) => {
    setImage(event.target.files[0])
    setCar({
      ...car,
      imageName: event.target.value.split('\\').at(-1)
    })
  }

  const handleClearFileInput = () => {
    setCar({
      ...car,
      imageName: ''
    })
  }

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/cars/${id}/`)
      if (res) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', car.name)
    formData.append('brand', car.brand)
    formData.append('model', car.model)
    formData.append('year', car.year)
    formData.append('kilometers', car.kilometers)
    formData.append('price', car.price)

    if (image) {
      formData.append('image', image)
    } else if (car.image) {
      formData.append('image', await getImageFromUrl(car.image))
    }

    if (id) {
      formData.append('id', id)

      try {
        const res = await api.put(`/cars/${id}/`, formData)
        navigate(`/car/${res.data.id}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await api.post('/cars/', formData)
        navigate(`/car/${res.data.id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen">
      <div className="p-4 py-8 mx-auto max-w-[520px] col-span-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-xl">{ id ? 'Editar Anúncio' : 'Novo anúncio' }</h1>
          {id ? 
            <button type="button"
              onClick={handleDelete}
            >
              <Icon name="Trash" className="w-6 h-6" />
            </button> : null
          }
        </div>

        {fields.map((field, index) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input type={field.type}
              name={field.name}
              className="w-full rounded-l p-2 mt-2 mb-4 border border-gray focus:outline-none focus:border-primary"
              onChange={handleInputChange}
              value={car[field.name]}
              required
            />
          </div>
        ))}

        <label htmlFor="image">Foto</label>
        <div className="flex border border-gray focus-within:border-primary p-2 mt-2 mb-8 w-full rounded-l">
          <input type={car.imageName ? 'text' : 'file'}
            name="image"
            className="w-full focus:outline-none peer"
            onChange={handleFileInputChange}
            value={car.imageName && car.imageName}
            readOnly={!!car.imageName}
            required
          />
          {car.imageName ? 
            <button onClick={handleClearFileInput}>
              <Icon name="XMark"
                className="w-6 h-6 peer-focus:text-primary"
              />
            </button> : null
          }
        </div>

        <button type="submit"
          className="block w-full bg-black-dark p-2 rounded text-white"
        >
          Salvar
        </button>

        <Link to={`/car/${id}`}>
          <p className="text-center p-2">Voltar</p>
        </Link>
      </div>
    </form>
  )
}
