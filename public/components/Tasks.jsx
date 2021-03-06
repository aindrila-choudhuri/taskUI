const React = require("react");
const axios = require('axios');
import './styles.css';
import RenderImages from "./RenderImages";

export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            imageUrls: [],
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    //event handler for clicking on Tasks
    handleClick(value) {
        axios.get('http://localhost:4421/frames', {
            params: {
                task: value+1
            }
        }).then((response) => {
            this.setState({
                imageUrls: response.data,
                clicked: true
            });
        })
    }

    //GetTask api is called on component did mount
    componentDidMount() {
        axios.get('http://localhost:4421/tasks').then((response) => {
            this.setState({
                tasks: response.data
            });
        })
    }

    //dynamically render tasks 
    renderTasks() {
        return this.state.tasks.map((val, index) => {
            return <div className="task" key={index} onClick={() => this.handleClick(index)}>
                Task {index + 1}
            </div>
        })
    }

    //The component render method
    render() {
        const tasks = this.renderTasks();
        return (
            <div className="layout-row container">

                <div className="sidebar">
                    <div className="layout-row layout-align-space-between">
                        <h2>
                            Task List
                        </h2>
                        <i className="material-icons">list</i>
                    </div>
                    {tasks}
                    
                </div>
                <div className="main-layout">
                    <RenderImages imageUrls={this.state.imageUrls} clicked={this.state.clicked}/>
                </div>
            </div>
        );
    }
}