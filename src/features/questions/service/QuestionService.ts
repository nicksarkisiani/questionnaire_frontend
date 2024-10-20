import {$api} from "../../../http";

export default class QuestionService {
    static async createQuestion(templateId: number, title: string, description: string, state: boolean, type: string, answers?: string[]) {
        return $api.post(`/templates/create-question/${templateId}`, {
            title,
            description,
            state,
            type,
            answers
        })
    }

    static async deleteQuestion(templateId: number, questionId: number) {
        return await $api.delete(`/templates/delete-question/${templateId}`, {data: {id: questionId}})
    }

}