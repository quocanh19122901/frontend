import { Box } from "@mui/material";
import "./Carousel.css";
import { Carousel } from "antd";
const SlideImage = () => (
  // autoplay
  <Carousel className="Carousel" autoplay>
    <Box>
      <img
        src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2023/44Boys-Day.jpg"
        alt=""
      />
    </Box>
    <Box>
      <img
        src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2023/Desktop-Banner-4_75.jpg"
        alt=""
      />
    </Box>
  </Carousel>
);
export default SlideImage;
