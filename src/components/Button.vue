<template>
  <div>
    <button class="keyboard__button" type="button"  @click="click()">{{title}}</button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ['type', 'value', 'title'],
  methods: {
    click() {
      console.log(`Button ${this.title} was clicked (type: ${this.type}, value: ${this.value})`)
      switch(this.type) {
        case 'operand':
          this.$parent.appendOperand(this.value);
          break
        case 'operator':
          this.$parent.appendOperator(this.value);
          break
        case 'clear':
          this.$parent.clear();
          break
        case 'result':
          this.$parent.eval();
          break
        default:
          throw `Unknown button type '${this.type}', choose one of [operand, operator, result]`
      }
    }
  }
}
</script>

<style scoped>
  .keyboard__button {
    min-width: 50px;
    min-height: 50px;
  }
</style>