import Navbar from "../components/Navbar";
import { images } from "../utils/images";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about">
        <div className="container about__wrap">
          <img src={images.about} alt="" className="about__img" />
          <div className="about__main">
            <h1 className="about__main-title">Dummy Shop</h1>
            <p className="about__main-text">
              Get ready to be amazed! Our shop is a treasure trove of unique and
              exciting products. You won't be disappointed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
