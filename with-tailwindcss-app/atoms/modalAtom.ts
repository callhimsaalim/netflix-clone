import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'


//We use state management for independent,isolated,separate components, thts how all components shud be, if we want to use state, we use state-management library like redux,recoil,  we want them to be called from direct stored memory, example <Modal> 
// we use state management, if we want to manage states, which is directly calling these components from stored directory
export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})