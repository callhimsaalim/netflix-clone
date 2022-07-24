import { async } from '@firebase/util'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/router'
  import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth } from '../firebase'

  interface AuthProviderProps{

    children: React.ReactNode                      //children is of react node type, which is generic for all react elements
  }

  interface IAuth {
    user: User | null                                                 // returns null
    signUp: (email: string, password: string) => Promise<void>         //accepts email & paswd, returns a promise
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }

  //we create context to wrap our whole application, it is called a higher order component
  
  const AuthContext = createContext<IAuth>({
    user: null,                                      // by default, user is null
    signUp: async () => {},                         //returns empty object
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  })

  export const AuthProvider = ({children}: AuthProviderProps)=> {

    const [loading, setLoading] = useState(false)
    const [user,setUser]= useState<User | null>(null)
    const router = useRouter()
    const [error, setError]= useState(null)
    const [initialLoading, setInitialLoading] = useState(true)


    //Persisting the user
    useEffect(
        () =>
          onAuthStateChanged(auth, (user) => {    //gets auth as input, returns user
            if (user) {
              // Logged in...
              setUser(user)
              setLoading(false)
            } else {
              // Not logged in...
              setUser(null)
              setLoading(true)
              router.push('/login')
            }
    
            setInitialLoading(false)
          }),
        [auth]
      )

    const signUp = async (email:string, password:string) => {

        setLoading(true)

        await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{

            setUser(userCredential.user)
            router.push('/')
            setLoading(false)

        }).catch((error)=> alert(error.message)).finally(()=> setLoading(false))

    }

    const signIn = async (email:string, password:string) => {

        setLoading(true)

        await signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{

            setUser(userCredential.user)
            router.push('/')
            setLoading(false)

        }).catch((error)=> alert(error.message)).finally(()=> setLoading(false))

    }


    const logout = async ()=>{

        setLoading(true)

        signOut(auth).then(()=>{
            setUser(null)
        }).catch((error)=> alert(error.message)).finally(()=> setLoading(false))

    }

    const memoedValue = useMemo(
        () => ({ user, signUp, signIn, error, loading, logout }),     // all this will recompute , only when one of the dependency changes- user,loading,error
        [user, loading, error]
      )


    return <AuthContext.Provider value={ memoedValue}>{!initialLoading && children}</AuthContext.Provider>   
    {/*AuthContext.Provider will be on top of app, wrapping everything refer _app.tsx */}
    // we will only show the UI , only when its completely logged in, after the use effect code runs
  }

  export default function useAuth() { //initial loading
    return useContext(AuthContext)
  }
