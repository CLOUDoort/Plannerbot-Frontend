import { atom } from 'jotai'

interface ViewTextType {
    [key: string]: string[]
}

interface TextArrayType {
    content: string,
    role: string
}

export const viewText = atom<ViewTextType>({})
export const textArray = atom<TextArrayType[]>([])