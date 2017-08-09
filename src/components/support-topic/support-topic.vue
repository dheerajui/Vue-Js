<template>
  <div class="support-topic"
  :class="[ (isCollapsed)? 'support-collapsed-min-height' : 'support-min-height']">
    <label class="headers" id="support-heading" for="search-text">
      {{localizer('caseLogging.support.title')}}
    </label>
    <input class="search-text" id="search-text" type="text"
    :placeholder="localizer('caseLogging.support.placeholder')"
    :value="caseDetails.caseTitle" v-if="!isCollapsed && !isCGEnabled"
    :readonly="isDisabled" aria-labelledby="support-heading" v-focus
    @input="caseDetailsUpdate" v-model="caseDetails.caseTitle">
    <div class="support-collapsed row" v-if="isCollapsed">
      <div class="image one column">
        <img src="../../components/support-topic/iTunes.svg" alt="">
      </div>
      <div class="case-title eleven columns" ><p>{{ caseDetails.caseTitle }}</p>
      </div>
      <div class="case-details eleven columns">
        <div>{{localizer('caseLogging.support.label.affectedProduct')}}: {{caseDetails.affectedProductDescription}}</div>
        <div class="componentDescription">{{localizer('caseLogging.support.label.component')}}: {{caseDetails.componentDescription}}</div>
        <div class="issueDescription">{{localizer('caseLogging.support.label.issue')}}: {{caseDetails.issueDescription}}</div>
      </div>
      <button class="support-edit button"
      @click="supportEdit(); hideTriggers();"
      v-show="!isDisabled">{{localizer('caseLogging.support.edit')}}</button>
    </div>
    <auto-complete v-if="!isCollapsed && isCGEnabled" 
    :placeholder="localizer('caseLogging.support.placeholder')" :readonly="isDisabled" 
    :arialabelledby="'support-heading'" :requestParams="requestParamsAutoComplete" 
    :charactersRequiredForApi="3" :url="'/api/v1/topic/suggestions'" 
    :method="'POST'" :value="caseDetails" 
    @titleSelect="setCaseTitle($event.title)" @latestTitle="setCaseTitle($event.title)"></auto-complete>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import autoComplete from '../common/auto-complete/auto-complete';

export default {
  data() {
    return {
      requestParamObj: {},
    };
  },
  name: 'support',
  props: {
    isSupportSectionCollapsed: {
      type: Boolean,
      required: true,
    },
    isSupportSectionDisabled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['caseDetails', 'isCGEnabled', 'requestParamsAutoComplete']),
    isCollapsed() {
      return this.isSupportSectionCollapsed;
    },
    isDisabled() {
      return this.isSupportSectionDisabled;
    },
  },
  methods: {
    supportEdit() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('supportCollapsed', { status: false });
    },
    ...mapActions(['setCaseTitle', 'hideTriggers', 'getSuggestions', 'clearSuggestions', 'setCaseDetailsUpdate']),
    caseDetailsUpdate() {
      this.setCaseTitle(this.caseDetails.caseTitle);
    },
  },
  components: {
    autoComplete,
  },
};
</script>

<style lang="scss">
.support-topic {
  .search-text {
    margin-top: 5px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support-collapsed {
    margin-top: 10px;

    .image {
      width: 50px;
    }

    .case-title {
      margin-left: 1%;
      width: 80%;
      min-height: 50px;

      p {
        margin-bottom: 5px;
      }
    }

    .case-details {
      margin-left: 1%;
      width: 88%;

      .componentDescription {
        display: inline-block;
        float: left;
        padding-right: 13px;
        width: 45%;
      }

      .issueDescription {
        text-overflow: ellipsis;
        width: 50%;
        white-space: nowrap;
        float: left;
        overflow: hidden;
      }
    }

    .support-edit {
      position: absolute;
      top: 5px;
      right: 5px;
      border-right-width: 1px;
    }
  }
}

.support-min-height {
    min-height: 80px;
  }

.support-collapsed-min-height {
    min-height: 0;
  }

</style>
