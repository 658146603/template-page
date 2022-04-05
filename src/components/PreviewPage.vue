<script lang="ts">
import { ref } from "vue";
import mdui from "mdui"
import {Widget, template_widgets, eval_widget_json} from "../widget"
import { eval_template, Template } from "../model";
import { request } from "../requests";

import Draggable from "vuedraggable";
import SlotDraggable from "./SlotDraggable.vue"

export default {
    name: "PreviewPage",
    components: { Draggable, SlotDraggable }
}

</script>

<script lang="ts" setup>
const content_preview = ref<Array<Widget>>([])
const page_title= ref<string>("")
const page_tid = ref<string>("")

function import_data(value?: string) {
  if (value == null || value.length == 0) return
  content_preview.value = (<Array<any>>JSON.parse(value)).map(eval_widget_json)
}

function get_template() {
  if (page_tid.value == null || page_tid.value.length == 0) {
    return
  }
  request(
    `template/${page_tid.value}`,
    {},
    (status, obj) => {
      if (status == 200 && obj.code == 200 && obj.data != null) {
        let template = eval_template(obj.data.template)
        console.log(template)
        page_title.value = template.title
        import_data(template.content)
      } else if (status == 200) {
        console.log(obj)
        page_tid.value = ""
        mdui.snackbar({
          message: '模版不存在',
          position: 'bottom',
        });
      }
    }
  )
}

const params = new URLSearchParams(location.search)
const _tid = params.get('tid')
if (_tid != null && _tid.length > 0) {
  page_tid.value = _tid
}

get_template()
</script>

<template>
    <div class="mdui-container-fluid">
      <div class="mdui-col-md-4"></div>
      <div class="mdui-col-md-4">
        <draggable
            id="template-container-root"
            class="template-container-root"
            v-bind="{ animation: 200 }"
            group="editor"
            item-key="id"
            :list="content_preview"
        >
          <template #item="{ element }">
            <div
                v-if="element.is_container()"
                class="template-container template-item mdui-container-fluid"
            >
              <slot-draggable
                  :id="`${element.id}-${index}`"
                  v-for="(slot, index) in element.children"
                  :slot="slot"
              ></slot-draggable>
            </div>
            <div v-else-if="!element.is_container()" :id="element.id" v-html="element.html"></div>
            <div v-else>Unknown</div>
          </template>
        </draggable>
      </div>
      <div class="mdui-col-md-4"></div>
    </div>
</template>