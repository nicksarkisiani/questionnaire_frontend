
export interface IQuestion {
    id: number
    title: string
    description: string
    type: "string" | "int" | "checkbox" | "text"
    state: boolean
    answers: string[]
}

export interface ITemplate {
    title: string
    description: string
    topic: string
    imageURL: string
    isPublic: boolean
    id: number
    intCount: number
    stringCount: number
    checkboxCount: number
    textCount: number
    questions: IQuestion[]
}

export type PartialTemplate = Partial<ITemplate>;