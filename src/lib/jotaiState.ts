import { atom } from 'jotai'

interface ViewTextType {
    [key: string]: string[]
}

interface TextArrayType {
    role: string,
    context: string
}

export const viewText = atom<ViewTextType>({})
export const limitCount = atom<number>(1)
export const textArray = atom<TextArrayType[]>([])
export const submitLoading = atom<boolean>(false)
