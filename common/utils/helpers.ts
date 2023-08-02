export const getFrame = async (time: number) => {
  const frameUrl = '' + time;
  const positionX = 0;
  const positionY = 0;
  const frameWidth = 100;
  const frameHeight = 50;

  return {
    url: frameUrl,
    positionX: positionX,
    positionY: positionY,
    frameWidth: frameWidth,
    frameHeight: frameHeight,
  };
};

export const loadImage = async (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    console.log(image);
    image.onerror = reject;
    image.src = url;
  });
};
