const React = require("react");
//import Flexi from "./Flexi";

//parent component of Flexi component which passes the flexiConfig object depending on which Flexi component creates the UI dynamically
export default class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(value) {
        console.log("value", value);
        //if value === task1 api.get set1 folders image
      }

    //The component render method
    render() {
        return (
            <div>
                <button onclick={this.handleClick('task1')}>Task1</button>
                <button onclick={this.handleClick('task2')}>Task2</button>
                <button onclick={this.handleClick('task3')}>Task3</button>
            </div>
        );
    }
}

