import React, { Component } from 'react'
import Webcam from "react-webcam"
import ReactCrop from "react-image-crop"
import { createRef } from 'react';
import "../../assets/css/webCam.css"
import 'react-image-crop/dist/ReactCrop.css';

class MyWebCam extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      imgSrc: "",
      src: null,
      completedCrop:"",
      crop: {
        unit: '%',
        width: 30,
        height: 16 / 9,
      },
    }
    this.pixelRatio = 4
    this.previewCanvasRef = createRef()
    this.webcamRef= createRef();
  }

  getResizedCanvas = (canvas, newWidth, newHeight) => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;
  
    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );
  
    return tmpCanvas;
  }

  generateDownload = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }
    const canvas = this.getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      blob => {
        const previewUrl = window.URL.createObjectURL(blob);
  
        const anchor = document.createElement("a");
        anchor.download = "cropPreview.png";
        anchor.href = URL.createObjectURL(blob);
        anchor.click();
  
        window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
  }


  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
    this.setState({completedCrop: crop})
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop: crop });
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

componentDidUpdate(){
  this.onUpdate()

}

onUpdate = ()=>{
  const {completedCrop } = this.state
  if (!completedCrop || !this.previewCanvasRef.current || !this.imgRef) {
    return;
  }

  const image = this.imgRef.current;
  const canvas = this.previewCanvasRef.current;
  const crop = completedCrop;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width * this.pixelRatio;
  canvas.height = crop.height * this.pixelRatio;

  ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  ctx.imageSmoothingEnabled = false;

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
          {/* { imgSrc && <img className="mb-2" id = "capture-image" src = {imgSrc} alt={"capture"} /> } */}
          { !imgSrc &&  <Webcam ref= {this.webcamRef}/>  }
          {imgSrc && (
            <ReactCrop
            src={imgSrc}
            crop={crop} 
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
          )}
          <button className="btn btn-primary" onClick={this.capture}>{ imgSrc ? "Camera" : "Capture" }</button>
          <div>
        <canvas
          ref={this.previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
            display: "none"
          }}
        />
      </div>
        {croppedImageUrl && (
          <img alt="Crop" className ="croped-image" src={croppedImageUrl} />
        )}
        { completedCrop &&
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          this.generateDownload(this.previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button>
  }
        </div>
        </div>
      </React.Fragment>
     );
  }
}
 
export default MyWebCam;