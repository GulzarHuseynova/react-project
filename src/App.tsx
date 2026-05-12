import './App.css'
import PrivateRoutes from './route/PrivateRoute/PrivateRoute'
import PublicRoutes from './route/PublicRoute/PublicRoutes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const isAutenticated = Boolean(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'))

  return (
    <BrowserRouter>
      {isAutenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  )
}

export default App