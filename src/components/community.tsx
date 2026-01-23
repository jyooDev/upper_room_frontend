import { Element } from "react-scroll";
import { RiArrowRightSLine } from "react-icons/ri";

const Community = () => {
  return (
    <Element name="community">
      <section id="community">
        <div className="mb-5 flex flex-col items-center text-center justify-start gap-3 relative h-[100vh] pt-20 xl:pt-40">
          <div className="mb-10 flex flex-col gap-3">
            <h1 className="font-bold text-3xl">Community</h1>
            <p className="text-gray-600">
              Share your daily life as a disciple of Jesus Christ.
            </p>
            <div className="flex gap-3 justify-center items-center">
              <button className="flex justify-between px-3 items-center bg-primary-50 p-2 w-35 rounded font-semibold text-xs text-white">
                Open Community <RiArrowRightSLine />
              </button>
              <button className="flex justify-between px-3 items-center bg-primary-50 p-2 w-35 rounded font-semibold text-xs text-white">
                Mission Updates <RiArrowRightSLine />
              </button>
            </div>
            <p>###NOT IMPLEMENTED YET</p>
          </div>
          <div className="flex gap-5"></div>
        </div>
      </section>
    </Element>
  );
};

export default Community;
