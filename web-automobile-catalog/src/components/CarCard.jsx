import { Link } from "react-router-dom"

export function CarCard({car, index}) {
  const formatNumber = (number) => {
    if (!number && number !== 0) return
    return number.toLocaleString('pt-br', {minimumFractionDigits: 0});
  }
  
  const formatPrice = (price) => {
    if (!price && price !== 0) return
    return parseFloat(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  return (
    <Link to={`car/${car.id}`}>
      <div className="w-full h-full shadow-md rounded max-h-[280px]">
        <img src={car.image} alt={`Foto do carro ${car.name} modelo ${car.model}`} 
          className="max-h-[65%] min-h-[65%] w-full rounded-t object-cover object-center"
        />

        <div className="p-2 mb-4">
          <p className="font-bold truncate">{car.brand} - {car.name} {car.model}</p>
          <p className="font-semibold text-sm text-gray">{car.year} • {formatNumber(car.kilometers)}</p>
          <p className="font-semibold text-lg text-primary mt-2">{formatPrice(car.price)}</p>
        </div>
      </div>
    </Link>
  );
}
