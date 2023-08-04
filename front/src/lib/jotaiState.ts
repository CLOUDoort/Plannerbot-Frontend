import { atom } from 'jotai'

interface ViewTextType {
    [key: string]: string[]
}

export const viewText = atom<ViewTextType>({})
