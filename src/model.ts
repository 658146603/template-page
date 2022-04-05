export class Template {
    tid: string
    creator: string
    title: string
    content?: string


    constructor(tid: string, creator: string, title: string, content?: string) {
        this.tid = tid;
        this.creator = creator;
        this.title = title;
        this.content = content;
    }
}

export function eval_template(obj: any): Template {
    return new Template(obj.tid, obj.creator, obj.title, obj.content)
}