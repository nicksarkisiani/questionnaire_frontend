import {$api} from "../../../http";

const basicStructure = {
    title: "Untitled",
    description: "Description",
    topic: "Empty",
    isPublic: false
}

export default class TemplateService {
    static async createTemplate() {
        return await $api.post("/templates/create", basicStructure)
    }

    static async getTemplateById(templateId: number) {
        return await $api.get(`/templates/${templateId}`)
    }
}