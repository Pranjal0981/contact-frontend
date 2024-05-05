import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './store/store.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient(); // Instantiate QueryClient

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <BrowserRouter>
    <ToastContainer/>
      <QueryClientProvider client={queryClient}>

      <App />
      </QueryClientProvider>

    </BrowserRouter>
  </Provider>
 
)
