import { ElButton } from "element-plus";
import { defineComponent, PropType } from "vue";
import VueDraggable from 'vuedraggable';

export const ListItemEdit = defineComponent({
    name: "ListItemEdit",
    props: {
        items: {
            type: Array as PropType<any[]>,
            default: () => [], required: true
        },
        item_slot: {
            type: Object as PropType<{
                item: (item: { element: any, index: number }) => JSX.Element,
                add_item: () => void,
                remove_item: (index: number) => void,
            }>,
            required: true
        }
    },
    setup(props) {
        const slots_data = {
            item: (slot_props: { element: any, index: number }): JSX.Element => {
                return (
                    <div class='mdui-list-item'>
                        <i class='mdui-list-item-icon mdui-icon material-icons slot-control-item-handle'>format_line_spacing</i>
                        <div class='mdui-list-item-content'>
                            {props.item_slot.item({ element: slot_props.element, index: slot_props.index })}
                        </div>
                        <i class='mdui-list-item-icon mdui-icon material-icons' onClick={() => { props.item_slot.remove_item(slot_props.index) }}>remove_circle</i>
                    </div>
                )
            },
            footer: (): JSX.Element => (
                <ElButton style={{ width: '100%', marginTop: '8px' }} onClick={() => props.item_slot.add_item()}>添加</ElButton>
            )
        }

        const slot_attrs = {
            handle: '.slot-control-item-handle',
            animation: 200,
        }

        return () => (
            <div class='mdui-list mdui-list-dense'>
                <VueDraggable list={props.items} itemKey='id' v-slots={slots_data} {...slot_attrs}></VueDraggable>
            </div>
        )
    }
})