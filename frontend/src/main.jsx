import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@chakra-ui/react/preset'
import App from './App.jsx'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
   <ChakraProvider value={system}>
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   </ChakraProvider>
)
