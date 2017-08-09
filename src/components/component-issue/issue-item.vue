<template lang="html">
  <li
    :class="classList"
  >
  <label
      class="tab-label"
      :id="'issue-' + item.cid"
      :tabindex="tabindex(item)"
      :aria-checked="item.isSelected"
      role="radio"
      v-on:click="radioClicked(item)"
      v-on:keydown="keydown(item, $event)"
      ref="tabpanelradio"
    >{{ item.name }}</label>
    <button
      v-caseloggingTooltip.left-start="{ content: item.description, classes: 'caselogging-tooltip' }"
      :class="{ hide: !item.isSelected}"
      v-on:keydown="keydown(item, $event)"
    >
      <span class="a11y">{{ item.description }}</span>
    </button>
  </li>
</template>

<script>
import imageToolTip from '../../components/common/image-tool-tip/image-tool-tip';

export default {
  name: 'issueItem',
  props: ['item'],
  components: {
    imageToolTip,
  },
  computed: {
    classList() {
      return {
        tabitem: true,
        selected: this.item.isSelected,
      };
    },
  },
  methods: {
    radioClicked(item) {
      this.$emit('radioClicked', item);
    },
    tabindex(item) {
      return item.isSelected ? '0' : '-1';
    },
    keydown(item, event) {
      const keycodes = [13, 27, 32, 37, 38, 40, 16];
      if (keycodes.includes(event.which)) {
        event.preventDefault();
      }

      // up down
      if (event.which === 38 || event.which === 40) {
        this.$emit('selectSibling', item, event.which);
      }

      // left escape shift+tab
      else if (event.which === 37 || event.which === 27 || (event.shiftKey && event.which === 9)) {
        this.$emit('focusParent', item);
      }

      // enter space
      else if (event.which === 13 || event.which === 32) {
        this.radioClicked(item);
      }
    },
  },
};
</script>
