<template>
  <div id="notesSection" class="notes-section">
    <div class="notes-top-section">
      <div class="notes-header">
        <p class="headers">{{localizer('caseLogging.notes.header')}}</p>
      </div>
      <div class="notes-buttons">
        <div class="dock-buttons">
          <div class="bottom-dock">
            <button class="custom-button"></button>
          </div>
          <div class="right-dock">
            <button class="custom-button"></button>
          </div>
        </div>
        <div class="detach-button">
          <button @click="detachNotes" class="custom-button" style="margin-right: 6px;">
          </button>
        </div>
      </div>
    </div>
    <textarea v-model="updatedNotes" class="notes-text-box"></textarea>
  </div>
</template>

<script>
import Nest from '@apple/chrysalis-nest';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'notes',
  data() {
    return {
      updatedNotes: '',
    };
  },
  mounted() {
    this.splitPanels();
  },
  methods: {
    ...mapActions([
      'setUpdatedNotes',
    ]),
    splitPanels() {
      Nest(['#mainContainer', '#notes'], {
        sizes: [80, 20],
        gutterSize: 3,
        direction: 'vertical',
        snapOffset: 0,
        keypressMoveSize: 5,
        elementStyle(dimension, size, gutterSize) {
          return {
            'flex-basis': `calc(${size}% - ${gutterSize}px)`,
          };
        },
        gutterStyle(dimension, gutterSize) {
          return {
            'flex-basis': `${gutterSize}px`,
          };
        },
      });
    },
    detachNotes() {
      this.sendMessage('NOTES_DETACH', { module: 'caselogging', caseId: this.caseId, notesData: this.getNotesContent });
    },
  },
  computed: {
    ...mapGetters([
      'caseId',
      'getNotesContent',
    ]),
  },
  watch: {
    updatedNotes() {
      this.setUpdatedNotes(this.updatedNotes);
    },
  },
};
</script>

<style lang="scss">
.notes-section {
  display: grid;
  position: relative;

  .notes-text-box {
    margin: 10px 12px;
    background: white;
    resize: none;
  }

  .notes-top-section {
    box-sizing: border-box;
    width: 100%;
    margin-top: 5px;

    .notes-header {
      display: inline-block;
      position: relative;
      vertical-align: top;
      width: auto;

      p {
        padding-left: 12px;
        margin: 0;
      }
    }
  }

  .notes-buttons {
    display: inline-block;
    width: auto;
    box-sizing: border-box;
    float: right;

    .detach-button {
      border: solid 1px #a5a4a8;
      border-radius: 4px;
      background: #d2d1d6;
    }

    .detach-button:hover {
      background: #a5a4a8;
    }

    .custom-button {
      background: url('detached.svg') no-repeat;
      cursor: pointer;
      width: 15px;
      height: 13px;
      border: none;
      background-size: 15px 15px;
      margin: 3px;
    }

    .dock-buttons {
      border: solid 1px #a5a4a8;
      border-radius: 4px;
      background: #d2d1d6;
      display: inline-block;
      vertical-align: top;
      width: auto;

      .bottom-dock {
        display: inline-block;
        width: auto;
        box-sizing: border-box;
        border-right: solid 1px #a5a4a8;
        padding-right: 2px;
      }

      .bottom-dock:hover {
        background: #a5a4a8;
      }

      .right-dock {
        display: inline-block;
        width: auto;
        box-sizing: border-box;
        margin-left: -3px;
      }

      .right-dock:hover {
        background: #a5a4a8;
      }
    }
  }
}

.gutter {
  background-color: #a5a4a8;
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-horizontal {
  cursor: ew-resize;
}

.gutter.gutter-vertical {
  cursor: row-resize;
}

.gutter.gutter-horizontal {
  position: relative;
  background-color: #bbb;

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -4px;
    width: 9px;
    bottom: 0;
  }
}

@media screen and (max-width: 5400px) and (min-width: 700px) {
  .app-container {
    flex-direction: row;
    display: inline-flex;
    width: 100%;

    .main-container {
      min-width: 50%;
      max-width: 60%;
      display: inline-block;
      border-right: 1px solid #a5a4a8;
      height: 100vh;
    }

    .notes {
      display: inline-block;
      min-width: 40%;

      .notes-text-box {
        min-height: calc(96vh - 20px);
        width: inherit;
      }

      .notes-top-section {
        width: 96%;
        height: 19px;
      }
    }

    .gutter.gutter-vertical {
      pointer-events: none;
      cursor: default;
      background-color: #f2f2f2;
    }
  }
}

@media screen and (max-width: 700px) and (min-width: 0) {
  .notes-text-box {
    min-width: calc(100% - 2px);
    max-width: 400px;
    height: calc(100% - 45px);
  }

  .notes-section {
    width: calc(100% - 20px);
  }
}

</style>
