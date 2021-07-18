<template>
  <div class="calculator">
    <input id="keyboardToggle" type="checkbox" v-model="showKeyboard">
    <label for="keyboardToggle">Переключить режим</label>
    <input id="showNumbers" type="checkbox" v-model="showNumbers" v-if="!showKeyboard">
    <label for="showNumbers" v-if="!showKeyboard">Показать кнопки с цифрами</label>
    <div v-if="showKeyboard">
      <div class="display">
        {{ operand2 ? operand2 : operand1 ? operand1 : '0' }}
      </div>
      <div class="keyboard">
        <Button v-for="number in [0,1,2,3,4,5,6,7,8,9]" type="operand" :title="number" :value="number" :key="number"/>
        <Button type="operand" title="." value="."/>
        <Button type="operator" title="AC" value="clear"/>
        <Button type="operator" title="+" value="sum"/>
        <Button type="operator" title="-" value="diff"/>
        <Button type="operator" title="*" value="mult"/>
        <Button type="operator" title="/" value="div"/>
        <Button type="operator" title="mod" value="mod"/>
        <Button type="operator" title="^" value="pow"/>
        <Button type="operator" title="=" value="result"/>
        <Button type="operator" title="del" value="del"/>
      </div>
    </div>

    <div v-if="!showKeyboard">
      <div>
        <br>
        <input type="text" v-model="operand1" id="operand_1__input">
        <div>{{ operatorTitle }}</div>
        <br>
        <input type="text" v-model="operand2" id="operand_2__input">
        <div v-if="operand1 && operand2">={{ this.calc() }}</div>
        <br>
        <input type="radio" id="operand_1_radio" value="operand_1" v-model="pickedOperand">
        <label for="operand_1_radio">Операнд 1</label>
        <input type="radio" id="operand_2_radio" value="operand_2" v-model="pickedOperand">
        <label for="operand_2_radio">Операнд 2</label>
      </div>
      <div class="keyboard">
        <Button v-for="number in [0,1,2,3,4,5,6,7,8,9]" type="operand" :title="number" :value="number" :key="number" :notShow="!showNumbers"/>
        <Button type="operator" title="del" value="del" :notShow="!showNumbers"/>
        <Button type="operator" title="+" value="sum"/>
        <Button type="operator" title="-" value="diff"/>
        <Button type="operator" title="*" value="mult"/>
        <Button type="operator" title="/" value="div"/>
        <Button type="operator" title="mod" value="mod"/>
        <Button type="operator" title="^" value="pow"/>
      </div>

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
  return parseInt(a/b);
};

Math.div = function (a, b) {
  return a / b;
};

Math.mult = function (a, b) {
  return a * b;
};


export default {
  name: "Calculator",
  components: {
    Button
  },
  data() {
    return {
      operand1: undefined,
      operand2: undefined,
      operator: undefined,
      operatorTitle: undefined,
      isResult: false,
      showKeyboard: true,
      showNumbers: true,
      pickedOperand: "operand_1"
    }
  },

  watch: {
    showKeyboard: function (newValue) {
      console.log(`Keyboard is switched ${newValue ? 'on' : 'off'}`);
      this.clear();
    }
  },
  methods: {
    operandValue(oldValue, value) {
      if (oldValue && value === '.' && oldValue.toString().includes(value)) {
        return oldValue;
      }

      if (this.isResult) {
        this.isResult = false;
        return value;
      }

      if (oldValue || value === '.') {
        return (oldValue ? oldValue : '0').toString() + value.toString();
      } else {
        return value;
      }
    },
    appendOperand(value) {
      if(!this.showKeyboard) {
        if (this.pickedOperand === "operand_1") {
          this.operand1 = this.operandValue(this.operand1, value);
        } else {
          this.operand2 = this.operandValue(this.operand2, value);
        }
        return;
      }
      if (this.operator) {
        this.operand2 = this.operandValue(this.operand2, value);
      } else {
        this.operand1 = this.operandValue(this.operand1, value);
      }
    },
    appendOperator(value, title) {
      switch (value) {
        case 'del':
          this.del();
          break;
        case 'clear':
          this.clear();
          break;
        case 'result':
          this.eval();
          break;
        default:
          if (this.operand2 && this.showKeyboard) {
            this.eval();
          }
          this.operator = value;
          this.operatorTitle = title;
      }
    },
    clear() {
      this.operand1 = undefined;
      this.operand2 = undefined;
      this.operator = undefined;
      this.operatorTitle = undefined;
      this.pickedOperand = "operand_1";
      this.showNumbers = true;
    },
    del() {
      if (this.isResult) return;

      if (this.operand2) {
        this.operand2 = this.delLastChar(this.operand2);
      } else if (this.operand1) {
        this.operand1 = this.delLastChar(this.operand1);
      }
    },
    delLastChar(text) {
      text = text.toString()
      return text.substring(0, text.length - 1)
    },
    eval() {
      if (this.operand2) {
        this.operand1 = this.calc();
        this.isResult = true;
      }
      if (this.showKeyboard) {
        this.operand2 = undefined;
        this.operator = undefined;
      }
    },
    calc() {
      if (this.operand1 && this.operand2 && this.operator) {
        const expression = `Math.${this.operator}(${this.operand1},${this.operand2})`;
        console.log(expression)
        return window.eval(expression);
      }
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