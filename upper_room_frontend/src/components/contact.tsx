import { Element } from "react-scroll";

const Contact = () => {
  return (
    <Element name="contact">
      <section
        id="contact"
        style={{ height: "100vh", backgroundColor: "lightblue" }}
      >
        <div className="flex flex-col items-center text-center justify-start gap-3 relative h-[100vh] pt-30 overflow-auto">
          <div>
            <h1 className="font-bold text-3xl">Contact</h1>
            <p className="text-gray-600">Contact Information</p>
            <p className="text-gray-600">###NOT IMPLEMENTED YET</p>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
