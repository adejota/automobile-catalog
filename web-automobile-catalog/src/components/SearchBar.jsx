import { Icon } from './Icon'

export function SearchBar({onSearch}) {
  const handleInputChange = (event) => {
    onSearch(event.target.value)
  }

  return (
    <div className="w-full p-4 bg-primary ">
      <div className='flex mx-auto max-w-[1320px]'>
        <input type="text"
          onChange={handleInputChange}
          placeholder="Busque por marca, modelo, ano, cor..."
          className="w-full rounded-l p-2 focus:outline-none"
        />

        <Icon name="MagnifyingGlass" className="w-10 h-10 text-gray bg-white p-2 rounded-r" />
      </div>
    </div>
  )
}
  