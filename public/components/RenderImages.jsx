const React = require("react");
import './styles.css';
import _ from 'lodash';
const axios = require('axios');

const IMAGES_PER_ROW = 5;

export default class RenderImages extends React.Component {
  constructor(props) {
    super(props);

    this.imageClick = this.imageClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.taskArr = [];
    this.obj = { fromIndex: '', toIndex: '' };

    this.state = {
      currentTab : 0
    }
  }

  componentWillReceiveProps({currentTab}) {
    this.setState({currentTab});
  }

  imageClick(columnIndex, rowIndex) {
    if (this.obj.fromIndex === '') {
      this.obj.fromIndex = {
        columnIndex, rowIndex
      }
    } else {
      if ((rowIndex < this.obj.fromIndex.rowIndex) ||
        ((rowIndex === this.obj.fromIndex.rowIndex) && (columnIndex < this.obj.fromIndex.columnIndex))) {
        return;
      }
      this.obj.toIndex = {
        columnIndex, rowIndex
      }
      let currentRowIndex = this.obj.fromIndex.rowIndex;
      let startIndex = this.obj.fromIndex.columnIndex;
      let endIndex = IMAGES_PER_ROW - 1;
      if (currentRowIndex === this.obj.toIndex.rowIndex) {
        for (let j = this.obj.fromIndex.columnIndex; j <= this.obj.toIndex.columnIndex; j++) {
          this.refs['imageRefs' + j + currentRowIndex].className = "imageStyleOpacity";
          this.taskArr.push(this.refs['imageRefs' + j + currentRowIndex].src);
        }
      }

      if (currentRowIndex < this.obj.toIndex.rowIndex) {
        for (let i = currentRowIndex; i <= this.obj.toIndex.rowIndex; i++) {
          if (i !== this.obj.fromIndex.rowIndex) {
            startIndex = 0
          }
          if (i == this.obj.toIndex.rowIndex) {
            endIndex = this.obj.toIndex.columnIndex
          }
          for (let j = startIndex; j <= endIndex; j++) {
            this.refs['imageRefs' + j + i].className = "imageStyleOpacity";
            this.taskArr.push(this.refs['imageRefs' + j + i].src);
          }
        }
      }

      this.obj = { fromIndex: '', toIndex: '' };
    }
  }

  renderRow(images, rowIndex) {
    return images.map((imageUrl, i) => {
      return (
        <img src={imageUrl} className="imageStyle" ref={"imageRefs" + i + rowIndex} key={i} onClick={() => this.imageClick(i, rowIndex)} />
      );
    })
  }

  renderImagesInGroups() {
    console.log("=render images in group called");
    return _.chunk(this.props.imageUrls, IMAGES_PER_ROW).map((imagesForRow, i) => {
      return (
        <div ref={"row" + i} key={i}>
          {this.renderRow(imagesForRow, i)}
        </div>
      )
    })
  }

  handleSubmit() {
    axios.post('http://localhost:4421/tasks', { taskArray: this.taskArr }).then((response) => {
      alert("Saved data successfully");
    })
  }

  renderButton() {
    if (this.props.imageUrls && this.props.imageUrls.length) {
      return (
        <div>
          <button className="buttonStyle" onClick={() => this.handleSubmit()}>Submit Task</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderImagesInGroups()}
        </div>
        {this.renderButton()}
      </div>
    );
  }


}