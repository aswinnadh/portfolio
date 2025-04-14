import React, { useState } from "react";
import { miniProjects } from "../constants";
import TitleHeader from "../components/TitleHeader";
import { PinContainer } from "../components/models/Works/3d-pin";
const Works = () => {
  const [visible, setVisible] = useState(4);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  return (
    <section id="all-works" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Learning Laboratory"
          sub="Smaller projects that fuel my continuous growth 🌱"
        />
        <div className="w-full padding-x-lg py-10 ">
          <div className="mx-auto grid-4-cols py-10 gap-20  ">
            {miniProjects.slice(0, visible).map(({  title, desc,liveLink,github,imgPath }) => (
              <PinContainer
                key={title}
                title={desc}
                className="min-w-60 w-full card-border rounded-xl p-4 flex flex-col gap-4"
              >
                <div className="w-full flex items-center justify-center rounded-full">
                  <img src={imgPath} alt={title} />
                </div>
                <h3 className="text-white text-m font-semibold mt-2">
                  {title}
                </h3>
                <div className="w-full flex justify-between">
                  <a
                    href={liveLink}
                    className="flex items-center gap-2 cursor-pointer text-white-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>Check Live Site</p>
                    <img
                      src="/images/icons/arrow-up.png"
                      alt="arrow"
                      className="w-3 h-3"
                    />
                  </a>
                  <a
                    href={github}
                    className="flex items-center gap-2 cursor-pointer text-white-600"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/images/socialmedias/github.png"
                      alt="github"
                      className="w-6 h-6  object-contain"
                    />
                  </a>
                </div>
              </PinContainer>
            ))}
          </div>
        </div>
        <div className="flex-center pb-10">
          <button onClick={showMoreItems} type="button">
            <div className="cta-button group w-60">
              <div className="bg-circle" />
              <p className="text">See more</p>
              <div className="arrow-wrapper">
                <img src="/images/arrow-down.svg" alt="arrow" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Works;
