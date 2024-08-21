import Navbar from "../components/Navbar";
import { images } from "../utils/images";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact">
        <div className="container contact__wrap">
          <h1 className="contact__title">Contact Us</h1>
          <div className="contact__info">
            <span className="contact__info-span">Email: dummy-shop@gmail.com</span>
            <div className="contact__info-socials">
              <img src={images.facebook} alt="" className="contact__info-socials-img" />
              <img src={images.twitter} alt="" className="contact__info-socials-img" />
              <img src={images.instagram} alt="" className="contact__info-socials-img" />
            </div>
          </div>
          <form className="contact__form">
            <input
              type="text"
              className="contact__form-input"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="contact__form-input"
              placeholder="Email"
            />
            <textarea className="contact__form-textarea" placeholder="Message"></textarea>
            <button className="contact__form-btn" type="submit">Contact Us</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
