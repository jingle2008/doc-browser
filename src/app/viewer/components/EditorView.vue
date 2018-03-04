<template>
  <codemirror
    ref="editor"
    :value="data"
    :options="cmOptions"
    @input="textChanged">
  </codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/matchesonscrollbar.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/display/placeholder';

function tabWithSpace(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection('add');
  } else {
    cm.execCommand('insertSoftTab');
  }
}

export default {
  name: 'EditorView',
  props: {
    data: {
      type: String,
      required: true,
    },
    fontSize: {
      type: Number,
    },
    wordWrap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cmOptions: {
        mode: {
          name: 'javascript',
          json: true,
        },
        tabSize: 2,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        showMatchesOnScrollbar: true,
        foldGutter: true,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
        ],
        placeholder: 'Enter your valid json here.',
        scrollbarStyle: 'simple',
        extraKeys: {
          Tab: tabWithSpace,
          'Shift-Tab': cm => cm.indentSelection('subtract'),
        },
      },
    };
  },
  mounted() {
    this.codemirror.setSize(null, 800);

    if (this.fontSize) {
      this.setFontSize();
    }

    this.setWordWrap();
  },
  computed: {
    codemirror() {
      return this.$refs.editor.codemirror;
    },
  },
  watch: {
    fontSize: 'setFontSize',
    wordWrap: 'setWordWrap',
  },
  methods: {
    setFontSize() {
      this.codemirror.getWrapperElement()
        .style['font-size'] = `${this.fontSize}px`;
      this.codemirror.refresh();
    },
    setWordWrap() {
      this.codemirror.setOption(
        'lineWrapping', this.wordWrap);
      this.codemirror.refresh();
    },
    textChanged(value) {
      this.$emit('update:data', value);
    },
    drop(e) {
      const file = e.dataTransfer.files[0];
      this.$emit('file-dropped', file);
    },
  },
  components: {
    codemirror,
  },
};
</script>

<style>
.CodeMirror {
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
}
.CodeMirror pre.CodeMirror-placeholder {
  color: #999;
}
</style>
