<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeHolder"
    class="p-1 focus:outline-none focus:border-blue-600"
    :class="customClass"
  >
</template>
<script setup lang="ts">
const props = defineProps<{
    type: string
    placeHolder: string
    width: string
    underline?: boolean
}>()

const model = defineModel<string | number>()

const customClass = ref("")

if (props.underline) {
    customClass.value = customClass.value.concat(" border-b-2")
} else {
    customClass.value = customClass.value.concat(" border-2")
}

if (props.width != undefined || props.width != "") {
    customClass.value = customClass.value.concat(" w-").concat(props.width)
}

</script>
<style lang="">
    
</style>