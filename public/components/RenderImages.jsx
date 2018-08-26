const React = require("react");
import './styles.css';

export default class RenderImages extends React.Component {
    renderImage(imageUrl, index) {
        return (
          <div className="imageStyle" key={index}>
            <img src={imageUrl} />
          </div>
        );
      }
    
      render() {
        return (
          <div>
            <div>
              {this.props.imageUrls.map((imageUrl, index) => this.renderImage(imageUrl, index))}
            </div>
          </div>
        );
      }
    
}