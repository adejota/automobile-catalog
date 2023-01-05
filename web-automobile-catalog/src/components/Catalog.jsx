import { useState } from 'react'
import { CarCard } from '../components/CarCard'
import { Icon } from '../components/Icon'

export function Catalog({cars, search, searchResult, onNewCarOrder}) {
  const orderList = ['Maior preço', 'Menor preço', 'Mais antigos', 'Mais novos', 'Menor km', 'Maior km']
  const [orderBy, setOrderBy] = useState('Maior preço')
  const [showMenu, setShowMenu] = useState(false)

  const handleOrderClick = (order) => {
    setOrderBy(order)
    onNewCarOrder(order)
    setShowMenu(false)
  }

  return (
    <section className='w-full h-full bg-primary-dark pt-6'>
      <div className='bg-white rounded-t-xl p-4'>
        <div className='mx-auto max-w-[1320px]'>
          <h2 className='text-lg font-semibold mb-4'>CARROS USADOS</h2>

          <div className='flex justify-between mb-4'>
            { !cars.length || (!searchResult.length && search) ?
              <span className='text-gray text-sm'>
                0 resultados
              </span> : null
            }

            { searchResult.length ?
              <span className='text-gray text-sm'>
                {searchResult.length} {searchResult.length === 1 ? 'resultado' : 'resultados'}
              </span> : null
            }

            { !searchResult.length && !search && cars.length ?
              <span className='text-gray text-sm'>
                {cars.length} {cars.length === 1 ? 'resultado' : 'resultados'}
              </span> : null
            }

            {!search ?
              <div className='flex justify-between'>
                <span className='mr-1 text-sm'>Ordenar: </span>
                
                <div className='relative'>
                  <button onClick={() => setShowMenu(!showMenu)}
                    className='flex items-center justify-end'
                  >
                    <span className='mr-1 text-primary text-sm'>{ orderBy }</span>
                    <Icon name="ChevronDown" className="w-4 h-4 text-primary" />
                  </button>

                  { showMenu ?
                    <div className='absolute bg-white w-32 right-0 top-8 border border-gray-light shadow rounded'>
                      <ul className='p-2'>
                        {orderList.map((order, index) => (
                          <li
                          onClick={ () => handleOrderClick(order) }
                            key={index}
                            className='p-2 hover:bg-gray-light rounded cursor-pointer'
                          >
                            { order }
                          </li>
                        ))}
                      </ul>
                    </div> : null
                  }
                </div>
              </div> : null
            }
          </div>

          {!cars.length || (!searchResult.length && search) ?
            <h1>Nenhum veículo encontrado</h1> : null
          }

          {search && searchResult.length ?
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
              {searchResult.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                />
              ))}
            </div> : null
          }

          {!search && cars.length ?
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
              {cars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                />
              ))}
            </div> : null
          }
        </div>
      </div>
    </section>
  );
}
