import { CustomMenu } from "@/components/custom/CustomMenu"
import { Outlet } from "react-router-dom"

export const HeroesLayout = () => {
  // return (
  //   <div className="bg-red-100" >
  //     <ul>
  //       <li><Link to={'/'}>Home</Link></li>
  //       <li><Link to={'/heroes/1'}>Hero</Link></li>
  //       <li><Link to={'/search'}>Búsqueda</Link></li>
  //       <li><Link to={'/admin'}>Admin</Link></li>
  //     </ul>
  //     <div className="mt-10">
  //       <Outlet />
  //     </div>
  //   </div>
  // )
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <CustomMenu />
        <Outlet />
      </div>
    </div>
  )
}
