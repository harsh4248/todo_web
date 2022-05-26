import { useState } from "react";
import ShowDialog from "./show_dialog";
//import UpdateDialog from "./update_dialog";

const SingleItem = (prop) => {
  const data = prop.singleData;
  const key = prop.id;
  const [isOpen, setisOpen] = useState(false);
  //const [updateDialogIsOpen, setupdateDialogIsOpen] = useState(false);

  return (
    <div className="mx-4 border my-2 h-full">
      <ShowDialog isOpen={isOpen} isOpenSetter={setisOpen} data={data} />
      {/* <UpdateDialog isOpen={updateDialogIsOpen} isOpenSetter={setupdateDialogIsOpen} data={data}/> */}
      <button
        className=" text-left hover:bg-gray-500 pl-2 w-full"
        key={key}
        id={key}
        onClick={() => {
          setisOpen(true);
        }}
      >
        <h1 className="text-lg font-semibold pt-2">{data.title}</h1>
        <p className="text-gray-400 text-sm pb-2">{data.time}</p>
      </button>
      <div className="w-full flex">
        <button className="mx-auto text-center hover:text-teal-400">Delete</button>
      </div>
    </div>
  );
};

export default SingleItem;
