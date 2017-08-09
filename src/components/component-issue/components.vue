<template lang="html">
  <ul class="tablist" role="tablist">
    <component-item
      ref="tablistitem"
      v-for="item in items"
      :key="item.id"
      :item="item"
      v-on:emitSelected="emitSelected"
      v-on:navRight="navRight"
      v-on:selectUpperSibling="selectUpperSibling"
    ></component-item>
  </ul>
</template>

<script>
import componentItem from './component-item';

export default {
  name: 'components',
  props: ['items'],
  components: {
    componentItem,
  },
  methods: {
    emitSelected(item) {
      this.$emit('emitSelected', item);
    },
    navRight(item) {
      this.$emit('navRight', item);
    },
    selectUpperSibling(item, which) {
      this.$emit('selectUpperSibling', item, which);
    },
  },
};
</script>
