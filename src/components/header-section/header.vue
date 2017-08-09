<template>
  <div class="header-section">
    <div class="detach-button">
      <button
        v-caseloggingTooltip.right-start="{ content: 'Detach', classes: 'caselogging-tooltip' }"
      >
      <span class="a11y">Detach</span>
      </button>
    </div>
    <div class="header-case">{{localizer('caseLogging.header.title')}} {{caseId}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imageToolTip from '../../components/common/image-tool-tip/image-tool-tip';

export default {
  name: 'header-block',
  methods: {
    detach() {
      this.sendMessage('DETACH', { module: 'caselogging', caseId: this.caseId });
    },
  },
  computed: {
    ...mapGetters([
      'caseId',
    ]),
  },
  components: {
    imageToolTip,
  },
  data() {
    return {
      imageToolTipId: 'detach',
      isImageToolTip: false,
    };
  },
};
</script>

<style lang="scss">

.header-section,
.detach-button,
.header-case {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.header-section {
  background-color: #d5d4d5;
  padding: 5px;
  width: 100%;

  .detach-button {
    display: inline-block;
    position: relative;
  }

  div.detach-button button {
    background: url('bomgar_alert_16x16.svg') no-repeat;
    cursor: pointer;
    width: 26px;
    height: 21px;
    border: none;
    background-size: 25px 20px;
    margin-bottom: 0;
  }

  .header-case {
    padding-top: 3px;
    padding-left: 3px;
  }
}

.detach-button,
.header-case {
  display: inline-block;
  vertical-align: top;
  width: auto;
}

</style>
