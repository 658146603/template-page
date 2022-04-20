import { defineComponent, ref } from "vue";
import mdui from "mdui";
import { request } from "../Request";
import { PageInfo, template_render_function } from "./Template";
import { ElButton, ElResult } from "element-plus";

const ReleasePage = defineComponent({
    name: "ReleasePage",
    props: {
        page: {
            type: String,
        }
    },
    setup({ page }) {
        const page_info = ref<PageInfo>()

        const access_page = () => {
            request(`access/${page}`, {}, (status, obj) => { console.log(status, obj) })
        }

        const get_page_info = () => {
            request(`page/${page}`, {}, (status, obj) => {
                if (status == 200 && obj.code == 200 && obj.data != null) {
                    console.log("data", obj.data)
                    const data = obj.data
                    page_info.value = {
                        pageId: data.pageId,
                        title: data.title,
                        elements: JSON.parse(obj.data.elements),
                        deployType: obj.data.deployType,
                        userVerify: obj.data.userVerify,
                        deployAddition: obj.data.deployAddition.split(' ')
                    }
                    console.log("elements", page_info.value)
                } else {
                    mdui.snackbar({
                        message: "获取页面失败",
                        position: "bottom",
                    })
                }
            })
        }

        access_page()
        get_page_info()

        const page_content = (page_info?: PageInfo) => {
            if (page_info) {
                return (
                    <div>
                        {page_info.elements.map(element => {
                            return template_render_function(element).render(element, page_info)
                        })}
                    </div>
                )
            } else {
                return (
                    <div>
                        <ElResult
                            icon="error"
                            title="页面不存在"
                            sub-title="请尝试刷新页面重试"
                            v-slots={{
                                "extra": () => (
                                    <ElButton type="primary" onClick={() => location.reload()}>刷新</ElButton>
                                )
                            }}>
                        </ElResult>
                    </div>
                )
            }
        }


        return () => (
            <div class='mdui-container'>
                <div class='mdui-col-md-4 mdui-col-sm-2'></div>
                <div class='mdui-col-md-4 mdui-col-sm-8'>
                    {page_content(page_info.value)}
                </div>
                <div class='mdui-col-md-4 mdui-col-sm-2'></div>
            </div>
        )
    },
    components: {
        ElResult,
        ElButton
    }
});

export default ReleasePage;