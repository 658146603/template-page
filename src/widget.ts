export function randomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const len = chars.length
    let s = ''
    for (let i = 0; i < 32; i++) {
        s += chars.charAt(Math.floor(Math.random() * len))
    }
    return s
}

export class SlotProp {
    size: number

    children: Array<Widget>

    constructor(size: number = 12, children: Array<Widget> = []) {
        this.size = size
        this.children = children
    }

    clone(): SlotProp {
        return new SlotProp(this.size)
    }

    static clone_props(props: Array<SlotProp>): Array<SlotProp> {
        return props.map(value => value.clone())
    }

    static create_slots(...sizes: number[]) {
        return sizes.map(value => new SlotProp(value))
    }
}

export class Widget {
    id: string
    html: string
    container: boolean

    constructor(id: string, html: string) {
        this.id = id
        this.html = html
        this.container = false
    }

    clone(): Widget {
        let widget = new Widget(randomId(), this.html)
        console.log(widget)
        return widget
    }

    is_container(): boolean {
        return this.container
    }
}

export class Container extends Widget {
    children: Array<SlotProp>

    constructor(id: string, html: string, children: Array<SlotProp>) {
        super(id, html)
        this.children = children
        this.container = true
    }

    clone(): Container {
        let container = new Container(randomId(), this.html, SlotProp.clone_props(this.children))
        console.log(container)
        return container
    }
}

export function create_widget(html: string): Widget {
    return new Widget(randomId(), html)
}

export function create_container(children: Array<SlotProp>, description: string): Container {
    return new Container(randomId(), description, children)
}

export const template_widgets = [
    create_widget("<p class='template-item p-single-line'>单行文本</p>"),
    create_widget("<input type='text' class='template-item mdui-textfield-input' placeholder='请输入文本'/>"),
    create_widget("<button class='template-item mdui-text-color-white mdui-color-green-400'>普通按钮</button>"),
    create_widget("<div class='template-item'><label class='mdui-checkbox'><input type='checkbox'/><i class='mdui-checkbox-icon'></i>多选框</label></div>"),
    create_widget("<div class='template-item'><label class='mdui-radio'><input type='radio' name='group1'/><i class='mdui-radio-icon'></i>单选框</label></div>"),
    create_container(SlotProp.create_slots(4, 4, 4, 12), "<div></div>"),
    create_container(SlotProp.create_slots(6, 6), "<div></div>"),
    create_container(SlotProp.create_slots(3, 9), "<div></div>")
]

export function eval_widget_json(value: any): Widget {
    if (value.container) {
        let children = value.children.map((slot: any) => new SlotProp(slot.size, slot.children.map((child: any) => eval_widget_json(child))))
        return new Container(value.id, value.html, children)
    } else {
        return new Widget(value.id, value.html)
    }
}