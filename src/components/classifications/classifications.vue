<template>
  <div class="classification-section">
    <div class="headers">{{localizer('caseLogging.classifications.header')}}
    </div>
    <ul id="list" tabindex="0" class="classification-list" role="listbox"
    aria-label="Recommended Classification Suggestions" @focus="setInitFocus"
    @keydown="setSiblingFocus" :aria-activedescendant="'listItem'+activeDescendant"
    aria-multiselectable="false">
      <classification-item
        ref="tablist"
        :item="item"
        v-for="item in updatedClassifications.CLASSIFICATIONS"
        v-bind:data="item"
        v-bind:key="item.classificationIndex"
        v-on:clickListItem="clickListItem"
        ></classification-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import classificationItem from './classification-item';

export default {
  name: 'classifications',
  components: {
    classificationItem,
  },
  methods: {
    // sets initial focus to first element only if isSelected of all other li elements are false
    // else sets class to the li element which has isSelected true
    setInitFocus() {
      const selectedItem = this.getItemSelected();
      if (Object.keys(selectedItem).length === 0) {
        this.setActiveDescendant(0);
        this.setIsSelectedStore(0);
      }
    },
    // calculate the scroll position depending on the scrollDown is down key or up key
    // scrollDown = true means key down was pushed
    calculateScrollPosition(scrollDown) {
      const listElement = this.$el.querySelector('#list');
      const listElementPosition = listElement.getBoundingClientRect();
      const listItemElement = listElement.querySelectorAll('.option-selected')[0];
      if (listItemElement) {
        const listItemElementPosition = listItemElement.getBoundingClientRect();
        const relativeListItemBottom = listItemElementPosition.bottom - listElementPosition.top;
        const relativeListItemTop = listItemElementPosition.top - listElementPosition.top;
        if (scrollDown) {
          if (relativeListItemBottom + listItemElementPosition.height > listElementPosition.height) {
            listElement.scrollTop += listElementPosition.height * 0.55;
          }
        }
        else if (relativeListItemTop < listItemElementPosition.height && listElement.scrollTop !== 0) {
          listElement.scrollTop -= listElementPosition.height * 0.55;
        }
      }
    },
    // handles all keyboard events to navigate through the list takes in event object as paramter
    setSiblingFocus(event) {
      const keycodes = [38, 40];
      if (keycodes.includes(event.keyCode)) { // when up or down arrows keys are pushed
        event.preventDefault();
        const selectedItem = this.getItemSelected();
        const currentIndex = this.getCurrentIndex(selectedItem);
        const itemslastIndex = this.updatedClassifications.CLASSIFICATIONS.length - 1;
        let nextIndex;
        if (event.keyCode === 40) { // Scroll Down
          this.calculateScrollPosition(true);
          nextIndex = currentIndex === itemslastIndex ? itemslastIndex : currentIndex + 1;
        }
        else { // Scroll Up
          this.calculateScrollPosition(false);
          nextIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        }
        selectedItem.isSelected = false;
        this.setActiveDescendant(nextIndex);
        this.setIsSelectedStore(nextIndex);
      }
    },
    // listening for the emit from child component to get the exact li element the click event was called on
    clickListItem(item) {
      const currentIndex = this.getCurrentIndex(item);
      this.resetIsSelectedStore();
      this.setActiveDescendant(currentIndex);
      this.setIsSelectedStore(currentIndex);
    },
    // utitlity method to reset all li elements' isSelected property to false
    resetIsSelectedStore() {
      this.updatedClassifications.CLASSIFICATIONS.forEach((itm) => {
        itm.isSelected = false;
      });
    },
    getItemSelected() {
      let selectedItem = {};
      this.updatedClassifications.CLASSIFICATIONS.forEach((item) => {
        if (item.isSelected === true) {
          selectedItem = item;
        }
      });
      return selectedItem || false;
    },
    getCurrentIndex(selectedItem) {
      return this.updatedClassifications.CLASSIFICATIONS.indexOf(selectedItem);
    },
    setActiveDescendant(index) {
      this.activeDescendant = this.updatedClassifications.CLASSIFICATIONS[index].classificationIndex;
    },
    ...mapActions([
      'setIsSelectedStore',
    ]),
  },
  data() {
    return {
      activeDescendant: '',
    };
  },
  computed: {
    ...mapGetters([
      'getClassifications',
    ]),
    // new instance of getClassifications to append isSelected key value pair
    updatedClassifications() {
      const obj = this.getClassifications;
      obj.CLASSIFICATIONS.forEach((item) => {
        item.isSelected = false;
      });
      return obj;
    },
  },
};
</script>

<style lang='scss'>
.classification-section {
  margin-bottom: 5px;

  .classification-header {
    margin-bottom: 4px;
  }

  .classification-list {
    display: block;
    position: relative;
    margin: 0;
    margin-top: 6px;
    padding: 0;
    border: 1px solid #e1e1e8;
    border-radius: 5px;
    height: 310px;
    overflow: auto;
  }
}
</style>
