import React, { Component } from 'react'
import Webcam from "react-webcam"
import ReactCrop from "react-image-crop"
import { createRef } from 'react';
import "../../assets/css/webCam.css"
import 'react-image-crop/dist/ReactCrop.css';

class MyWebCam extends Component {
  constructor(props) {
    super(props);
    this.state = { imgSrc: "",
      src: null,
      crop: {
        unit: '%',
        width: 30,
        height: 16 / 9,
        completedCrop:""
      },
    }
    this.previewCanvasRef = createRef()
    this.webcamRef= createRef();
  }

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
    this.setState({CompletedCrop: crop})
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  generateDownload = (previewCanvas, crop) => {
    console.log("convas" , previewCanvas + "Crop" , crop)
    if (!crop || !previewCanvas) {
      return;
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }


 capture = () => {
   if(this.state.imgSrc)
   {
      this.setState({imgSrc : ""})
      return
   }
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({imgSrc: imageSrc});
  }
 
  render() { 
    const {imgSrc , crop , croppedImageUrl , completedCrop} = this.state
    return ( 
      <React.Fragment>
        <div className="custom-container">
        <div className="inner-box">
          { imgSrc && <img className="mb-2" id = "capture-image" src = {imgSrc} alt={"capture"} /> }
          { !imgSrc &&  <Webcam ref= {this.webcamRef}/>  }
          {imgSrc && (
            <ReactCrop
            src={imgSrc}
            crop={crop} 
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            // onChange={c => this.setState({crop: c})}
            // onComplete={c => this.setState({CompletedCrop: c})}
          />
          )}
          <button className="btn btn-primary" onClick={this.capture}>{ imgSrc ? "Camera" : "Capture" }</button>
          <div>
        <canvas
          ref={this.previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0
          }}
        />
      </div>
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )}
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          this.generateDownload(this.previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button>
        </div>
        </div>
      </React.Fragment>
     );
  }
}
 
export default MyWebCam;