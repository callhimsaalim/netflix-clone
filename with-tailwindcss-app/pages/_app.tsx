import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'


function MyApp({ Component, pageProps }: AppProps) {
  return (

       // Higher order component
      <RecoilRoot>
      <AuthProvider>
      <Component {...pageProps} /> {/* our entire nextjs app */}
      </AuthProvider>
      </RecoilRoot>
  
  )
}

export default MyApp
