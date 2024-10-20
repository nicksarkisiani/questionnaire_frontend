import {$api} from "../../../http";
import {PartialTemplate} from "../../../types/templates.ts";

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

    static async patchValues(valuesObject: PartialTemplate, templateId: number) {
        return await $api.patch(`/templates/${templateId}`, valuesObject)
    }

    static async patchImage(file: FormData, templateId: number) {
        return await $api.patch(`/templates/image/${templateId}`, file)
    }

    static async getTopics() {
        return await $api.get("/topics/all");
    }

    static async updateTopic(templateId: number, topicId: number) {
        return await $api.patch(`/templates/update-topic/${templateId}`, {id: topicId})
    }


    static async getAll() {
        return await $api.get(`/templates/`)
    }
}