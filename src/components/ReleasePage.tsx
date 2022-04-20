import { defineComponent, ref } from "vue";
import mdui from "mdui";
import { request } from "../Request";
import { Widget } from "../Widget";
import { template_render_function } from "./Template";

interface DeployOption {
    id: string
    group: string
    name: string
    price: number
    description: string
}

interface PageInfo {
    title: string
    elements: Widget[]
    features: DeployOption[]
}

const ReleasePage = defineComponent({
    name: "ReleasePage",
    props: {
        page: {
            type: String,
        }
    },
    setup({ page }) {
        const page_info = ref<PageInfo>()

        const get_page_info = () => {
            request(
                `page/${page}`,
                {},
                (status, obj) => {
                    if (status == 200 && obj.code == 200 && obj.data != null) {
                        console.log("data", obj.data)
                        page_info.value = {
                            title: obj.data.title,
                            elements: JSON.parse(obj.data.elements),
                            features: obj.data.features
                        }
                        console.log("elements", page_info.value)
                    } else {
                        mdui.snackbar({
                            message: "获取页面失败",
                            position: "bottom",
                        })
                    }
                }
            )
        }

        get_page_info()

        return () => (
            <div class='mdui-container'>
                <div class='mdui-col-md-4 mdui-col-sm-2'></div>
                <div class='mdui-col-md-4 mdui-col-sm-8'>
                    {
                        page_info.value?.elements.map(element => {
                            return template_render_function(element).release_view(element)
                        })
                    }
                </div>
                <div class='mdui-col-md-4 mdui-col-sm-2'></div>
            </div>
        )
    }
});

export default ReleasePage;