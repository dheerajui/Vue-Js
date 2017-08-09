<template lang="html">
  <div
    :class="panelClass"
    :id="'panel-' + item.cid"
    :aria-labelledby="'tab-' + item.cid"
    role="tabpanel"
  >
    <ul>
      <issue-item
        v-for="i in item.issues"
        :key="item.cid"
        :item="i"
        v-on:radioClicked="radioClicked"
        v-on:focusParent="focusParent"
        v-on:selectSibling="selectSibling"
        ref="tabpanelitem"
      ></issue-item>
    </ul>
  </div>
</template>

<script>
import issueItem from './issue-item';

export default {
  name: 'issues',
  props: ['item'],
  components: {
    issueItem,
  },
  computed: {
    panelClass() {
      return {
        tabpanel: true,
        hide: !this.item.isSelected,
      };
    },
  },
  methods: {
    radioClicked(item) {
      const data = {
        item,
        component: this.item,
      };
      this.$emit('radioClicked', data);
    },
    focusParent(item) {
      this.$emit('focusParent', item);
    },
    selectSibling(item, which) {
      this.$emit('selectSibling', item, which);
    },
  },
};
</script>
