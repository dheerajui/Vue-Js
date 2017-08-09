<template lang="html">
  <li
    :key="item.cid"
    :id="'tab-' + item.cid"
    v-on:click="clickedItem(item)"
    v-on:keydown="keydown(item, $event)"
    :class="{'selected' : item.isSelected, 'child-selected' : childSelected}"
    role="tab"
    :aria-controls="'panel-' + item.cid"
    :aria-selected="item.isSelected ? 'true' : 'false'"
    :aria-expanded="item.isSelected ? 'true' : 'false'"
    :tabindex="tabindex"
  ><p class="tab-label">{{item.name}}</p>
  <span class="arrow arrow-right"></span></li>
</template>

<script>
export default {
  name: 'componentItem',
  props: ['item'],
  methods: {
    clickedItem(item) {
      this.$emit('emitSelected', item);
    },
    keydown(item, event) {
      const keycodes = [13, 27, 32, 38, 39, 40, 9];
      if (keycodes.includes(event.which)) {
        event.preventDefault();
      }

      // right tab
      if (event.which === 39 || event.which === 9) {
        this.$emit('navRight', item);
      }

      // up down
      if (event.which === 38 || event.which === 40) {
        this.$emit('selectUpperSibling', item, event.which);
      }

      // enter space
      if (event.which === 13 || event.which === 32) {
        this.$emit('emitSelected', item);
      }
    },
  },
  computed: {
    tabindex() {
      return this.item.isSelected ? '0' : '-1';
    },
    childSelected() {
      let ret = false;
      if (this.item.isSelected && this.item.issues) {
          /* eslint-disable no-confusing-arrow */
        const arr = this.item.issues.map(el => el.isSelected ? 1 : 0);
        if (arr.includes(1)) {
          ret = true;
        }
      }
      return ret;
    },
  },
};
</script>
