import React, { useRef, useEffect } from 'react';

const DogTag = (props) => {
  const canvasRef = useRef(null);
  const background = (ctx) => {
    var bg = new Image();
    bg.onload = function () {
      ctx.drawImage(bg, 0, 0);
    };
    bg.src = props.bg
  }
  const initial = (ctx) => {
    var img = new Image();
    var bg = new Image();
    img.onload = function () {
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(img, 0, 0);
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(props.name, (260 / 2), (174 / 2 + 10));
    };
    bg.src = props.bg;
    img.src = 'https://i.imgur.com/Bw5CxVn.png';

  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 260;
    canvas.height = 174;
    // background(context);
    initial(context);
  }, [initial])
  return (
    <div>
      <br></br>
      <canvas ref={canvasRef} {...props} />

    </div>
  )
}

export default DogTag;


//https://i.imgur.com/4StcF0Uh.jpg