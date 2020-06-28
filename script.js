class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      firstInput: null,
      operator: null,
      waitingForSecondInput: false };

    this.clear = this.clear.bind(this);
    this.input = this.input.bind(this);
    this.formula = this.formula.bind(this);
    this.inputDecimal = this.inputDecimal.bind(this);
  }

  clear() {
    this.setState({
      display: "0",
      firstInput: null,
      operator: null,
      waitingForSecondInput: false });

  }

  input(event) {
    if (
    this.state.waitingForSecondInput === true &&
    this.state.display !== "-")
    {
      this.setState({
        display: event.target.value,
        waitingForSecondInput: false });

    } else if (this.state.display === "0") {
      this.setState({
        display: event.target.value });

    } else {
      this.setState({
        display: this.state.display + event.target.value,
        waitingForSecondInput: false });

    }
  }

  inputDecimal(dot) {
    if (this.state.waitingForSecondInput === true) return;
    if (!this.state.display.includes(dot.target.value)) {
      this.setState({
        display: this.state.display + dot.target.value });

    }
  }

  formula(nextOperator) {
    const performCalculation = {
      "/": (firstInput, secondOperand) => firstInput / secondOperand,

      x: (firstInput, secondOperand) => firstInput * secondOperand,

      "+": (firstInput, secondOperand) => firstInput + secondOperand,

      "-": (firstInput, secondOperand) => firstInput - secondOperand,

      "=": (firstInput, secondOperand) => secondOperand };


    const inputValue = parseFloat(this.state.display);
    if (this.state.display === "-") {
      this.setState({
        operator: nextOperator.target.value,
        display: this.state.firstInput });

      return;
    }
    if (nextOperator.target.value === "-" && this.state.waitingForSecondInput) {
      this.setState({
        display: nextOperator.target.value });

      return;
    }
    if (this.state.operator && this.state.waitingForSecondInput) {
      this.setState({
        operator: nextOperator.target.value });

      return;
    }
    if (this.state.firstInput === null) {
      this.setState({
        firstInput: inputValue });

    } else if (this.state.operator) {
      const result = performCalculation[this.state.operator](
      this.state.firstInput,
      inputValue);

      this.setState({
        display: String(result),
        firstInput: result });

    }
    this.setState({
      operator: nextOperator.target.value,
      waitingForSecondInput: true });

  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "calculator" },
      React.createElement("div", { id: "display" }, this.state.display),
      React.createElement("div", { id: "keys" },
      React.createElement("button", { id: "add", class: "operator", value: "+", onClick: this.formula }, "+"),


      React.createElement("button", {
        id: "subtract",
        class: "operator",
        value: "-",
        onClick: this.formula }, "-"),



      React.createElement("button", {
        id: "multiply",
        class: "operator",
        value: "x",
        onClick: this.formula }, "x"),



      React.createElement("button", {
        id: "divide",
        class: "operator",
        value: "/",
        onClick: this.formula }, "/"),



      React.createElement("button", { id: "zero", value: "0", onClick: this.input }, "0"),


      React.createElement("button", { id: "one", value: "1", onClick: this.input }, "1"),


      React.createElement("button", { id: "two", value: "2", onClick: this.input }, "2"),


      React.createElement("button", { id: "three", value: "3", onClick: this.input }, "3"),


      React.createElement("button", { id: "four", value: "4", onClick: this.input }, "4"),


      React.createElement("button", { id: "five", value: "5", onClick: this.input }, "5"),


      React.createElement("button", { id: "six", value: "6", onClick: this.input }, "6"),


      React.createElement("button", { id: "seven", value: "7", onClick: this.input }, "7"),


      React.createElement("button", { id: "eight", value: "8", onClick: this.input }, "8"),


      React.createElement("button", { id: "nine", value: "9", onClick: this.input }, "9"),


      React.createElement("button", { id: "decimal", value: ".", onClick: this.inputDecimal }, "."),


      React.createElement("button", { id: "clear", onClick: this.clear }, "AC"),


      React.createElement("button", { id: "equals", value: "=", onClick: this.formula }, "=")))));






  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));