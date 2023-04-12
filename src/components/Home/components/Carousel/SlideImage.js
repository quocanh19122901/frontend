import "./Carousel.css";
import { Carousel } from 'antd';
const SlideImage = () => (
  // autoplay
  <Carousel  autoplay>
    <div >
      <img
        src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2023/44Boys-Day.jpg"
        alt=""
      />
    </div>
    <div >
      <img
        src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2023/Desktop-Banner-4_75.jpg"
        alt=""
      />
    </div>
  </Carousel>
);
export default SlideImage;