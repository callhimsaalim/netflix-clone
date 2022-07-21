import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'


function MyApp({ Component, pageProps }: AppProps) {
  return (

       // Higher order component
      <AuthProvider>
      <Component {...pageProps} /> {/* our entire nextjs app */}
      </AuthProvider>
  
  )
}

export default MyApp
