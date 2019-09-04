<template>
  <div :id="id" class="mathfield">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    },
    onKeystroke: {
      type: Function,
      default (_keystroke, _ev) { return true }
    },
    onMoveOutOf: {
      type: Function,
      default (_direction) { return true }
    },
    onTabOutOf: {
      type: Function,
      default (_direction) { return true }
    }
  },
  watch: {
    value (newValue, oldValue) {
      // When the `value` prop (from the model) is modified
      // update the mathfield to stay in sync, but don't send back content
      // change notifications, to avoid infinite loops.
      if (newValue !== oldValue) {
        this.$el.mathfield.$latex(newValue, {
          suppressChangeNotifications: true
        })
      }
    },
    config: {
      deep: true,
      handler (config) {
        this.$el.mathfield.$setConfig(config)
      }
    }
  },
  mounted () {
    // A new instance is being created
    const vm = this // Keep a reference to the ViewModel
    // Wait until the DOM has been constructed...
    this.$nextTick(function () {
      // ... then make the MathField
      vm.$mathlive.makeMathField(vm.$el, {
        ...vm.config,
        // To support the 'model' directive, this handler will connect
        // the content of the mathfield to the ViewModel
        onContentDidChange: (_) => {
          // When the mathfield is updated, notify the model.
          // The initial input value is generated from the <slot>
          // content, so it may need to be updated.
          vm.$emit('input', vm.$el.mathfield.$latex())
        },
        // Those asynchronous notification handlers are translated to events
        onFocus: (_) => { vm.$emit('focus') },
        onBlur: (_) => { vm.$emit('blur') },
        onContentWillChange: (_) => { vm.$emit('content-will-change') },
        onSelectionWillChange: (_) => { vm.$emit('selection-will-change') },
        onUndoStateWillChange: (_, command) => { vm.$emit('undo-state-will-change', command) },
        onUndoStateDidChange: (_, command) => { vm.$emit('undo-state-did-change', command) },
        onVirtualKeyboardToggle: (_, visible, keyboardElement) => { vm.$emit('virtual-keyboard-toggle', visible, keyboardElement) },
        onReadAloudStatus: (_, status) => { vm.$emit('read-aloud-status', status) },

        // Those notification handlers expect an answer back, so translate
        // them to callbacks via props
        onKeystroke (_, keystroke, ev) { return vm.onKeystroke(keystroke, ev) },
        onMoveOutOf: (_, direction) => { return vm.onMoveOutOf(direction) },
        onTabOutOf: (_, direction) => { return vm.onTabOutOf(direction) }

      })
    })
  },
  methods: {
    /*
    *
    * @param {string} selector
    */
    perform (selector) {
      this.$el.mathfield.$perform(selector)
    },
    /*
    * @return {boolean}
    */
    hasFocus () {
      return this.$el.mathfield.$hasFocus()
    },
    focus () {
      this.$el.mathfield.$focus()
    },
    blur () {
      this.$el.mathfield.$blur()
    },
    text (format) {
      return this.$el.mathfield.$text(format)
    },
    selectedText (format) {
      return this.$el.mathfield.$selectedText(format)
    },
    insert (text, options) {
      this.$el.mathfield.$insert(text, options)
    },
    keystroke (keys, evt) {
      return this.$el.mathfield.$keystroke(keys, evt)
    },
    typedText (text) {
      this.$el.mathfield.$keystroke(text)
    },
    selectionIsCollapsed () {
      return this.$el.mathfield.$selectionIsCollapsed()
    },
    selectionDepth () {
      return this.$el.mathfield.$selectionDepth()
    },
    selectionAtStart () {
      return this.$el.mathfield.$selectionAtStart()
    },
    selectionAtEnd () {
      return this.$el.mathfield.$selectionAtEnd()
    },
    select () {
      this.$el.mathfield.$select()
    },
    clearSelection () {
      this.$el.mathfield.$clearSelection()
    }
  }
}
</script>
