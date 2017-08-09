<template>
  <div id="app" :class="[isNotesVisible ? 'app-container' : 'app-container-detached']">
    <loading-spinner v-if="!isAppLoaded"></loading-spinner>
    <div v-else id="mainContainer" class="main-container">
      <header-section v-show="isHeaderVisible"></header-section>
      <p class="notification-message">
        {{localizer('caseLogging.header.notification.msg')}}
      </p>
      <div role="group" aria-label="support section"  aria-describedby="support"
        class="support-section">
        <support-topic :isSupportSectionCollapsed="isSupportSectionCollapsed"
        :isSupportSectionDisabled= "isSupportSectionDisabled"
        @supportCollapsed="setIsSupportSectionCollapsed($event.status);
         setIsClassificationVisible(false);">
       </support-topic>
        <div v-if="!isSupportSectionCollapsed" class="">
          <div class="recommendedLink" v-if="isChooseOtherLinkClicked">
            <a @click.stop.prevent="recommendedLinkClick"
            @keyup.space="recommendedLinkClick" class="links" href="#" v-focus>
            {{localizer('caseLogging.support.recommendedLink')}} >
            </a>
          </div>

          <affected-product v-if="!isClassificationVisible"></affected-product>

          <component-issue v-if="!isClassificationVisible && isComponentIssueVisisble"></component-issue>

          <classifications v-if="isClassificationVisible"></classifications>

          <div v-if="isClassificationVisible">
            <a @click.stop.prevent="changeOtherLinkClick"
            @keyup.space="changeOtherLinkClick" class="links" href="#">
            {{localizer('caseLogging.support.chooseOtherLink')}} >
            </a>
          </div>

          <div class="next-button-container">
            <button @click="showTriggers(), setIsSupportSectionCollapsed(true),
            updateClassification();" class="button next-button">
            {{localizer('caseLogging.support.button.next')}}
            </button>
          </div>
        </div>
      </div>
      <div id="support" class="hidden" aria-hidden="true">
      <span>This is section1</span>
      </div>
      <triggers></triggers>
    </div>
    <div v-if="isAppLoaded" v-show="isNotesVisible" id="notes" class="notes">
      <notes>
      </notes>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loadingSpinner from './components/common/loading-spinner/loading-spinner';
import headerSection from './components/header-section/header';
import supportTopic from './components/support-topic/support-topic';
import classifications from './components/classifications/classifications';
import affectedProduct from './components/affected-product/affected-product';
import componentIssue from './components/component-issue/component-issue';
import triggers from './components/triggers/triggers';
import notes from './components/notes/notes';

export default {
  name: 'app',
  components: {
    loadingSpinner,
    headerSection,
    supportTopic,
    classifications,
    affectedProduct,
    componentIssue,
    triggers,
    notes,
  },
  computed: {
    ...mapGetters([
      'isAppLoaded',
      'isHeaderVisible',
      'isSupportSectionCollapsed',
      'isSupportSectionDisabled',
      'isClassificationVisible',
      'isChooseOtherLinkClicked',
      'getSelectedClassification',
      'triggersAreShowing',
      'isNotesVisible',
      'componentIssueData',
    ]),
    isComponentIssueVisisble() {
      return this.componentIssueData && this.componentIssueData.length > 0;
    },
  },
  mounted() {
    this.cocoabirdInit();
    this.sendMessage('REQUEST_CUSTOMER_DATA');
    this.sendMessage('REQUEST_PRODUCT_DATA');
  },
  methods: {
    ...mapActions([
      'setIsSupportSectionCollapsed',
      'setIsChooseOtherLinkClicked',
      'setIsClassificationVisible',
      'setProductComponentIssue',
      'resetClassificationStore',
      'resetCaseLoggingStore',
      'hideTriggers',
      'showTriggers',
    ]),
    changeOtherLinkClick() {
      this.setIsChooseOtherLinkClicked(true);
      this.setIsClassificationVisible(false);
      this.resetClassificationStore();
      this.resetCaseLoggingStore();
    },
    recommendedLinkClick() {
      this.setIsChooseOtherLinkClicked(false);
      this.setIsClassificationVisible(true);
    },
    updateClassification() {
      this.setProductComponentIssue(this.getSelectedClassification);
    },
  },
};
</script>

<style lang="scss">
@import "~bourbon/app/assets/stylesheets/bourbon";
@import '~@apple/flutterby/src/scss/base/mixins';
@import '~@apple/flutterby/src/scss/base/z-index';
@import '~@apple/flutterby/src/scss/base/variables';
@import '~@apple/flutterby/src/scss/base/normalize';
@import '~@apple/flutterby/src/scss/base/functions';
@import '~@apple/flutterby/src/scss/base/base-styles';
@import '~@apple/flutterby/src/scss/base/utils';
@import '~@apple/flutterby/src/scss/base/typography';
@import '~@apple/flutterby/src/scss/modules/grid';
@import '~@apple/flutterby/src/scss/modules/buttons';
@import '~@apple/flutterby/src/scss/modules/forms';
@import '~@apple/flutterby/src/scss/modules/lists';
@import '~@apple/flutterby/src/scss/modules/code';
@import '~@apple/flutterby/src/scss/modules/tables';
@import '~@apple/flutterby/src/scss/modules/spacing';
@import '~@apple/flutterby/src/scss/modules/media-queries';
@import '~@apple/flutterby/src/scss/modules/a11y';
@import 'style/base/layout';

.support-section {
  margin: 5px 10px;
  border: 1px solid #e1e1e8;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  padding: 7px 5px;
  background-color: white;
}

.hidden {
display: none;
}

.recommendedLink {
  text-align: center;
}

.next-button-container {
    text-align: center;
}

.next-button {
  background-color: white;
  border: 1px solid #e1e1e8;
  color: black;
  width: 100px;
  font-weight: bold;
  box-shadow: 0 0 2px #888;
}

</style>
