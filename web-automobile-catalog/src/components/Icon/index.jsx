import { UserCircle } from './UserCircle'
import { MagnifyingGlass } from './MagnifyingGlass'
import { ChevronDown } from './ChevronDown'
import { Home } from './Home'
import { Pencil } from './Pencil'
import { XMark } from './XMark'
import { Trash } from './Trash'
import { Plus } from './Plus'
import { ArrowRightOnRectangle } from './ArrowRightOnRectangle'

export function Icon({name, className}) {
  const defaultClassName = 'w-6 h-6'

  if (name === 'UserCircle') {
    return (
      <UserCircle className={className ? className : defaultClassName} />
    )
  }

  if (name === 'MagnifyingGlass') {
    return (
      <MagnifyingGlass className={className ? className : defaultClassName} />
    )
  }

  if (name === 'ChevronDown') {
    return (
      <ChevronDown className={className ? className : defaultClassName} />
    )
  }

  if (name === 'Home') {
    return (
      <Home className={className ? className : defaultClassName} />
    )
  }

  if (name === 'Pencil') {
    return (
      <Pencil className={className ? className : defaultClassName} />
    )
  }

  if (name === 'XMark') {
    return (
      <XMark className={className ? className : defaultClassName} />
    )
  }

  if (name === 'Trash') {
    return (
      <Trash className={className ? className : defaultClassName} />
    )
  }

  if (name === 'Plus') {
    return (
      <Plus className={className ? className : defaultClassName} />
    )
  }

  if (name === 'ArrowRightOnRectangle') {
    return (
      <ArrowRightOnRectangle className={className ? className : defaultClassName} />
    )
  }
}
  