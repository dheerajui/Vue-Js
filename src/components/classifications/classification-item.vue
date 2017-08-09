<template>
  <li
    :class="{'option-selected' : item.isSelected}"
    :aria-selected="item.isSelected ? 'true' : 'false'"
    @click="clickListItem(item)"
    role="option"
    :id="'listItem'+item.classificationIndex">
    <div class="classification-item" v-bind:style="styleClass">
        <div class="product">{{item.affectedProductDescription}}</div>
        <div class="issue">{{item.issueDescription}}</div>
        <div class="component">{{item.componentDescription}}</div>
    </div>
  </li>
</template>

<script>

export default {
  name: 'classification-item',
  props: ['item'],
  data() {
    return {
      styleClass: {
        background: `url(${this.item.affectedProductImageURL})`,
        backgroundSize: '45px 24px',
        backgroundPosition: '3px 9px',
        backgroundRepeat: 'none',
        border: 'none',
      },
    };
  },
  methods: {
    clickListItem(item) {
      this.$emit('clickListItem', item);
    },
  },
};
</script>

<style lang="scss">
.classification-list {
  .option-selected {
    background-color: #92c5fd;
  }

  .classification-item {
    padding-left: 50px;
  }

  li {
    list-style: none;
  }

  li:hover {
    cursor: pointer;
  }

  li:last-child {
    margin: 0;
  }
}

</style>
