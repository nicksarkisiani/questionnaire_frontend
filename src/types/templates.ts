

export interface ITemplate {
    title: string
    description: string
    topic: string
    imageURL: string
    isPublic: boolean
    id: number
}

export type PartialTemplate = Partial<ITemplate>;