import { defineComponent } from "vue";

export const ControlListItem = defineComponent({
    name: "ControlListItem",
    props: {
        title: String,
        vertical: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { slots }) {
        if (props.vertical) {
            return () => (
                <>
                    <div class="mdui-container-fluid list-item">
                        <div class="mdui-col-md-12 list-item-title">{props.title}</div>
                        <div class="mdui-col-md-12 list-item-control">
                            {slots.default && slots.default()}
                        </div>
                    </div>
                </>
            )
        } else {
            return () => (
                <>
                    <div class="mdui-container-fluid mdui-valign list-item">
                        <div class="mdui-col-xs-4 list-item-title">{props.title}</div>
                        <div class="mdui-col-xs-8 list-item-control">
                            {slots.default && slots.default()}
                        </div>
                    </div>
                    <div class="normal-divider-micro"></div>
                </>
            )
        }
    }
})