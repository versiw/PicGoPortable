<template>
  <el-form-item
    :label="label"
  >
    <el-button
      type="primary"
      round
      size="small"
      :disabled="disabled"
      @click="handleClick"
    >
      {{ buttonLabel }}
    </el-button>
  </el-form-item>
</template>
<script lang="ts" setup>

interface IProps {
  label: string
  buttonLabel: string
  disabled?: boolean
}

defineProps<IProps>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

</script>
<script lang="ts">
export default {
  name: 'ButtonFormItem'
}
</script>
<style lang='stylus'>
</style>
