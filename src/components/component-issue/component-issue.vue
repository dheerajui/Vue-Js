<template>
  <div>
    <h4 class="headers" id="component-issue">{{ localizer('caseLogging.componentIssue.title' )}}</h4>
    <div class="tabselect" :aria-labeelledby="ariaLabel">
      <components
        :items="componentIssueData"
        v-on:emitSelected="selectedComponent"
        v-on:navRight="navRight"
        v-on:selectUpperSibling="selectUpperSibling"
        ref="tablist">
      </components>
      <div class="tabselect-panels" role='presentation'>
        <issues
          v-for="item in componentIssueData"
          :key="item.cid"
          :item="item"
          v-on:focusParent="focusComponent"
          v-on:radioClicked="issueSelected"
          v-on:selectSibling="selectedIssue"
          ref="tabpanels">
        </issues>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import components from './components';
import issues from './issues';

export default {
  name: 'componentIssue',
  components: {
    components,
    issues,
  },
  data() {
    return {
      ariaLabel: 'component-issue',
    };
  },
  computed: {
    ...mapGetters([
      'componentIssueData',
    ]),
  },
  methods: {
    ...mapActions(['issueSelected', 'componentSelected', 'deselectAllItems', 'focusOnIssue', 'deSelectIssue']),

    getSelectedComponentIndex(item) {
      return this.componentIssueData.indexOf(item);
    },
    selectedComponent(item) {
      const selComponentIndex = this.getSelectedComponentIndex(item);
      this.deselectAllItems(item);
      this.componentSelected(selComponentIndex);
    },
    navRight(item) {
      const parentComponentIndex = this.getSelectedComponentIndex(item);
      const data = {
        componentIndex: parentComponentIndex,
        IssueIndex: 0,
      };
      this.focusOnIssue(data);
      this.$refs.tabpanels[parentComponentIndex].$refs.tabpanelitem[0].$refs.tabpanelradio.focus();
    },
    selectUpperSibling(item, which) {
      const currentIndex = this.getSelectedComponentIndex(item);
      const itemslastIndex = this.componentIssueData.length - 1;
      let nextIndex;
      if (which === 40) {
        nextIndex = currentIndex === itemslastIndex ? 0 : currentIndex + 1;
      }
      else {
        nextIndex = currentIndex === 0 ? itemslastIndex : currentIndex - 1;
      }
      this.selectedComponent(this.componentIssueData[nextIndex]);
      this.$refs.tablist.$refs.tablistitem[nextIndex].$el.focus();
    },

    focusComponent(item) {
      this.componentIssueData.forEach((node) => {
        if (node.isSelected) {
          this.$refs.tablist.$refs.tablistitem.forEach((tabitem) => {
           /* eslint-disable no-underscore-dangle */
            if (tabitem._props.item.isSelected) {
              tabitem.$el.focus();
            }
           /* eslint-enable no-underscore-dangle */
          });
        }
      });
      this.deSelectIssue(item);
    },

    selectedIssue(item, which) {
      let obj;
      this.componentIssueData.forEach((el) => {
        if (el.isSelected === true) {
          obj = el;
        }
      });
      const currentIndex = obj.issues.indexOf(item);
      const itemslastIndex = obj.issues.length - 1;
      const componentIndex = this.getSelectedComponentIndex(obj);
      let nextIndex;
      if (which === 40) {
        nextIndex = currentIndex === itemslastIndex ? 0 : currentIndex + 1;
      }
      else {
        nextIndex = currentIndex === 0 ? itemslastIndex : currentIndex - 1;
      }
      this.deSelectIssue(item);
      const data = {
        componentIndex,
        IssueIndex: nextIndex,
      };
      this.focusOnIssue(data);
      this.$refs.tabpanels.forEach((panel) => {
        panel.$refs.tabpanelitem.forEach((el) => {
         /* eslint-disable no-underscore-dangle */
          if (el._props.item.isSelected) {
            el.$refs.tabpanelradio.focus();
          }
         /* eslint-enable no-underscore-dangle */
        });
      });
    },
  },
};
</script>

<style lang="scss">
.tabselect {
  display: flex;
  border: 1px solid #666;

  .tablist,
  .tabselect-panels {
    height: 250px;
    overflow: scroll;
    width: 50%;
    line-height: 1.5;
    padding: 0;

      .hide {
        display: none;
      }

      .arrow {
        margin: 1% 1% 0 0;
        padding: 0;
        display: inline-block;
        position: relative;
        float: right;

        &.arrow-right {
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #000;
        }
      }

      .selected .arrow-right {
        border-left-color: #fff;
      }

      .selected.child-selected .arrow-right {
        border-left-color: #000;
      }
    }

  .tabselect-panels {
    border-left: 1px solid #666;
  }

  .selected {
    background-color: blue;
    color: #fff;
  }

  .child-selected {
    background-color: #ccc;
    color: inherit;
  }

  ul {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  li {
    cursor: pointer;
    padding-left: 15px;
    margin: 0;
    outline: none;
  }

  .tab-label {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 90%;
  }

  .tabitem {
    position: relative;

    .helpIcon {
      display: inline-block;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      color: blue;
      width: 1.2rem;
      height: 1.2rem;
    }

    .hide {
      display: none;
    }

    .tab-label {
      width: 95%;
      height: 28px;
      font-weight: 400;
    }

    &.selected .tab-label {
      width: 85%;
    }
  }
}

</style>
