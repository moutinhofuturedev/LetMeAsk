import { BrowserRouter,Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from "./pages/NewRoom"
import { FirstRoom } from './pages/FirstRoom'

import { AuthContextProvider } from './context/AuthContext'
import { AdminRoom } from './pages/AdminRoom'

function App() {
  
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' component={NewRoom} />
          <Route path='/rooms/:id' component={FirstRoom} />
          <Route path='/admin/rooms/:id' component={AdminRoom} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App

