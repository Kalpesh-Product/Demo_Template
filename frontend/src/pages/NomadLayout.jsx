import { Outlet } from 'react-router-dom'

const NomadLayout = () => {
  return (
    <div className='py-4'>
      <Outlet />
    </div>
  )
}

export default NomadLayout
