import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Upload from "./components/Upload";
import Storage from "./components/Storage";
import TextEditor from "./components/TextEditor";
import { useState } from "react";

const ProfileOverview = () => {
  const [contentValue, setContentValue] = useState();
  const handleGenerateResChange = (generateRes: any) => {
    setContentValue(generateRes);
    console.log("Generate Response:", generateRes);
  };
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        {/* <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div> */}

        <div className="z-0 col-span-3 lg:!mb-0">
          <Upload />
        </div>
        <div className="col-span-5 lg:!mb-0 ml-4">
          <Storage onEditorDataChange={handleGenerateResChange} />
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <TextEditor newsletterContnent={contentValue} />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
