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

    //variable to store all the task image URLs to post to api
    this.taskArr = [];

    //variable to store the from and to co-ordinates of the selected images
    this.obj = { fromIndex: '', toIndex: '' };

    //variable to store the refs off all the images for which the style(opacity has been changed)
    //on tab changes the style is reset to original values.
    this.changedRefs = []
  } 

  //event gets fired on click of any of the images
  //takes two parameters the rowIndex and columnIndex of the image
  imageClick(columnIndex, rowIndex) {
    //logic to store the fromIndex and toIndex of the selected cycle on click
    if (this.obj.fromIndex === '') {
      this.obj.fromIndex = {
        columnIndex, rowIndex
      }
    } else {
      // if the toIndex row is smaller or in the same row of the fromIndex but column index in less in that case 
      // no need to perform any action
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

      //if the fromIndex and toIndex is in the same row then change opacity of the images in the which lies between the column index
      if (currentRowIndex === this.obj.toIndex.rowIndex) {
        for (let j = this.obj.fromIndex.columnIndex; j <= this.obj.toIndex.columnIndex; j++) {
          this.refs['imageRefs' + j + currentRowIndex].className = "imageStyleOpacity";
          //pushed all the refs for which style has been changed
          this.changedRefs.push(this.refs['imageRefs' + j + currentRowIndex]);
          //pushed all the task image URLs which has been selected
          this.taskArr.push(this.refs['imageRefs' + j + currentRowIndex].src);
        }
      }

      //if the fromIndex and toIndex are in different column in that case for every column in between style has to chnaged
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
            //pushed all the refs for which style has been changed
            this.changedRefs.push(this.refs['imageRefs' + j + i]);
            //pushed all the task image URLs which has been selected
            this.taskArr.push(this.refs['imageRefs' + j + i].src);
          }
        }
      }

      //once done reset the fromIndex and toIndex
      this.obj = { fromIndex: '', toIndex: '' };
    }
  }

  //method to reset the style on changing of tab (Task)
  changeClass(){
    if (this.props.clicked === true) {
      if (this.changedRefs.length) {
        this.changedRefs.forEach((ref) => {
          ref.className="imageStyle";
        })
      }
      
      return "imageStyle";
    }
  }

  //method to render images in a particular row
  //takes parameter images(imageUrls), rowIndex
  renderRow(images, rowIndex) {
    return images.map((imageUrl, i) => {
      return (
        <img src={imageUrl} className={this.changeClass()} ref={"imageRefs" + i + rowIndex} key={i} onClick={() => this.imageClick(i, rowIndex)} />
      );
    })
  }

  //method to chunk the images in smaller arrays
  renderImagesInGroups() {
    return _.chunk(this.props.imageUrls, IMAGES_PER_ROW).map((imagesForRow, i) => {
      return (
        <div ref={"row" + i} key={i}>
          {this.renderRow(imagesForRow, i)}
        </div>
      )
    })
  }

  //event handler for submit button
  handleSubmit() {
    axios.post('http://localhost:4421/tasks', { taskArray: this.taskArr }).then((response) => {
      alert("Saved data successfully");
    })
  }

  //method to show submit button after the task images are loaded
  renderButton() {
    if (this.props.imageUrls && this.props.imageUrls.length) {
      return (
        <div>
          <button className="buttonStyle" onClick={() => this.handleSubmit()}>Submit Task</button>
        </div>
      );
    }
  }

  //component render method
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