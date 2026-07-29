import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar'
import AppRoutes from './routes'
import Footer from './components/footer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950'>
          <Navbar />
          <main className='flex-1'>
            <AppRoutes/>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
