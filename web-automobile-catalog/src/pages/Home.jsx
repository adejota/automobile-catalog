import { useState, useEffect } from 'react'
import api from "../lib/api"
import { SearchBar } from '../components/SearchBar'
import { Catalog } from '../components/Catalog'

export default function Home() {
  const [cars, setCars] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const orderCars = (order) => {
    if (order === 'Maior preço') {
      return setCars(cars.sort((a, b) => b.price - a.price))
    }

    if (order === 'Menor preço') {
      return setCars(cars.sort((a, b) => a.price - b.price))
    }

    if (order === 'Mais antigos') {
      return setCars(cars.sort((a, b) => a.year - b.year))
    }

    if (order === 'Mais novos') {
      return setCars(cars.sort((a, b) => b.year - a.year))
    }

    if (order === 'Menor km') {
      return setCars(cars.sort((a, b) => a.kilometers - b.kilometers))
    }

    if (order === 'Maior km') {
      return setCars(cars.sort((a, b) => b.kilometers - a.kilometers))
    }
  }

  const searchCar = (t) => {
    const results = []
    const text = t.toString().toLowerCase()
    setSearch(text)
    
    for (const element of cars) {
      for (const key in element) {
        if (key === 'id' || key === 'image' || key === 'created_at') {
          continue
        }

        if (element[key].toString().toLowerCase().includes(text)) {
          if (!results.includes(element)) results.push(element);
        }
      }
    }

    setSearchResult(results)
  }

  useEffect(() => {
    const getCars = async () => {
      try {
        const res = await api.get('/cars')
        setCars(res.data.sort((a, b) => b.price - a.price))
      } catch (error) {
        console.log(error)        
      }
    }

    getCars()
  }, [])

  return (
    <div className='min-h-screen'>
      <SearchBar
        onSearch={(text) => searchCar(text)}
      />

      <Catalog
        cars={cars}
        search={search}
        searchResult={searchResult}
        onNewCarOrder={(order) => orderCars(order)}
      />
    </div>
  )
}
