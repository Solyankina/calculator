<template>
  <div class="calculator">
    <div class="display">
      {{operand2 ? operand2 : operand1 ? operand1 : '0'}}
    </div>
    <div class="keyboard">
      <Button type="operand" title="0" value="0"/>
      <Button type="operand" title="1" value="1"/>
      <Button type="operand" title="2" value="2"/>
      <Button type="operand" title="3" value="3"/>
      <Button type="operand" title="4" value="4"/>
      <Button type="operand" title="5" value="5"/>
      <Button type="operand" title="6" value="6"/>
      <Button type="operand" title="7" value="7"/>
      <Button type="operand" title="8" value="8"/>
      <Button type="operand" title="9" value="9"/>
      <Button type="operand" title="." value="."/>
      <Button type="operator" title="AC" value="clear"/>
      <Button type="operator" title="+" value="sum"/>
      <Button type="operator" title="-" value="diff"/>
      <Button type="operator" title="*" value="mult"/>
      <Button type="operator" title="/" value="div"/>
      <Button type="operator" title="mod" value="mod"/>
      <Button type="operator" title="^" value="pow"/>
      <Button type="operator" title="=" value="result"/>
    </div>
  </div>

</template>

<script>
import Button from "./Button";

Math.sum = function (a, b) {
  return a + b;
};

Math.diff = function (a, b) {
  return a - b;
};

Math.mod = function (a, b) {
  return a % b;
};

Math.div = function (a, b) {
  return a / b;
};

Math.mult = function (a, b) {
  return a * b;
};


export default {
  name: "Calculator",
  components: {Button},
  data() {
    return {
      operand1: undefined,
      operand2: undefined,
      operator: undefined,
      isResult: false
    }
  },
  methods: {
    operandValue(oldValue, value) {
      if(oldValue && value === '.' &&  oldValue.toString().includes(value)) {
        return oldValue;
      }

      if(this.isResult) {
        this.isResult = false;
        return value;
      }

      if(oldValue || value === '.') {
        return (oldValue ? oldValue : '0') + value;
      } else {
        return value;
      }
    },

    appendOperand(value) {
      if(this.operator) {
        this.operand2 = this.operandValue(this.operand2, value);
      } else {
        this.operand1 = this.operandValue(this.operand1, value);
      }
    },
    appendOperator(value) {
      switch(value) {
        case 'clear':
          this.clear();
          break
        case 'result':
          this.eval();
          break
        default:
          if(this.operand2) {
            this.eval();
          }
          this.operator = value;
      }
    },
    clear() {
      this.operand1 = undefined;
      this.operand2 = undefined;
      this.operator = undefined;
    },
    eval() {
      if(this.operand2) {
        const expression = `Math.${this.operator}(${this.operand1},${this.operand2})`;
        console.log(expression)
        this.operand1 = window.eval(expression);
        this.isResult = true;
      }
      this.operand2 = undefined;
      this.operator = undefined;

    }
  }
}
</script>

<style scoped lang="scss">

.calculator {
    border: 1px solid #ccc;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
}

.display {
  width: 93%;
  height: 80px;
  border: none;
  background-color: #252525;
  color: #fff;
  text-align: right;
  padding-right: 20px;
  padding-left: 10px;
  font-size: 4rem;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

</style>