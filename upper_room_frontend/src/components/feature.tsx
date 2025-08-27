import { Element } from "react-scroll";
import { AiOutlineTranslation } from "react-icons/ai";
import { FaChurch } from "react-icons/fa";
import { IoHeartHalf } from "react-icons/io5";

// Assets
import bible from "../assets/hero-page/feature-bible.jpg";
import community from "../assets/hero-page/feature-community.jpg";
import globe from "../assets/hero-page/feature-globe.jpg";

const Features = () => {
  return (
    <Element name="features">
      <section id="features">
        <div className="flex flex-col items-center text-center justify-start gap-3 relative h-[100vh] max-h-full pt-30">
          <div>
            <h1 className="font-bold text-3xl">Features</h1>
            <p className="text-gray-600">
              UpperRoom envisions the church as a true community of faith,
              nurturing authentic fellowship within and carrying the Gospel
              beyond every barrier.
            </p>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-4 w-70 h-90 border-1 border-gray-200 rounded p-4">
              <div>
                <AiOutlineTranslation className="w-8 h-8" />
              </div>
              <div>
                <img
                  src={bible}
                  className="object-cover overflow-hidden h-35 w-full rounded"
                />
              </div>
              <div className="text-left flex flex-col gap-2">
                <h2 className="font-bold text-sm">
                  Service Transcript + Translation
                </h2>
                <p className="text-sm text-gray-600">
                  Break language barriers with auto-generated transcripts and
                  translations in 50+ languages. Access, study, and share
                  anytime.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-70 h-90 border-1 border-gray-200 rounded p-4">
              <div>
                <FaChurch className="w-8 h-8" />
              </div>
              <div>
                <img
                  src={community}
                  className="object-cover overflow-hidden h-35 w-full rounded"
                />
              </div>
              <div className="text-left flex flex-col gap-2">
                <h2 className="font-bold text-sm">Member-Only Space</h2>
                <p className="text-sm text-gray-600">
                  A private hub for your church to share events, prayer request,
                  testimonies, and sermons, building fellowship from within.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-70 h-90 border-1 border-gray-200 rounded p-4">
              <div>
                <IoHeartHalf className="w-8 h-8" />
              </div>
              <div>
                <img
                  src={globe}
                  className="object-cover overflow-hidden h-35 w-full rounded"
                />
              </div>
              <div className="text-left flex flex-col gap-2">
                <h2 className="font-bold text-sm">Public Community</h2>
                <p className="text-sm text-gray-600">
                  Connect with churches worldwide through open discussions,
                  shared testimonies, and mission updates, building one body
                  beyond borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Features;
