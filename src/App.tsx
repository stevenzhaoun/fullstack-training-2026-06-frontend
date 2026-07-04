import Layout from './components/Layout'
import { Routes, Route } from 'react-router'
import ListUsers from './modules/users/ListUsers'
import CreateOrUpdateUser from './modules/users/CreateOrUpdateUser'
import Login from './components/Login'
import RootContainer from './components/RootContainer'
import Dashboard from './modules/dashboard/Dashboard'

const Roles = () => {
  return <div>Roles</div>
}

const Products = () => {
  return <div>Products</div>
}

const Orders = () => {
  return <div>Orders</div>
}

function App() {
  return (
    <RootContainer>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/:id" element={<CreateOrUpdateUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </RootContainer>
  )
}

export default App
