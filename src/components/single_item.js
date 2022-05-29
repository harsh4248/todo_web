import { useEffect, useState } from "react";
import ShowDialog from "./show_dialog";
//import UpdateDialog from "./update_dialog";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";

const SingleItem = (prop) => {
  //const data = prop.singleData;
  // const key = prop.id;
  // const mainArr = prop.dataArr;
  // const data = mainArr[key];
  // const mainArrSetter = prop.arrSetter;
   const deleteHandler = prop.deleteHandler;
   const [isOpen, setisOpen] = useState(false);
  // console.log(data.title + ' ' + data.body);
  // const fetchHandler = prop.fetchHandler;
  //const [updateDialogIsOpen, setupdateDialogIsOpen] = useState(false);
  const valIdx = prop.valIdx;
  const [data,setData] = useState();

  useEffect(() => {
    const auth = getAuth();
    if(auth.currentUser !== null) {
      const db = getDatabase();
      const itemRef = ref(db, "users/"+auth.currentUser +"/todoItems" )
      onValue(itemRef,(snapshot) => {
        const temp = [];
        snapshot.forEach((child) => {
          const value = child.val();
          const key = child.key;
          const title = value.title;
          const body = value.body;
          const time = value.time;
          const singleItem = {
            key: key,
            title: title,
            body: body,
            time: time,
          };
          temp.push(singleItem);
        })
        setData(temp[valIdx]);
      });
      
    }
  });
  

  return (
    <div className="mx-4 border my-2 h-full" key={valIdx}>
      <ShowDialog isOpen={isOpen} isOpenSetter={setisOpen} data={data} />
      {/* <UpdateDialog isOpen={updateDialogIsOpen} isOpenSetter={setupdateDialogIsOpen} data={data}/> */}
      <button
        className=" text-left hover:bg-gray-500 pl-2 w-full"
        onClick={() => {
          setisOpen(true);
        }}
      >
        <h1 className="text-lg font-semibold pt-2">{data.title}</h1>
        <p className="text-gray-400 text-sm pb-2">{data.time}</p>
      </button>
      <div className="w-full flex">
        <button
          className="mx-auto text-center hover:text-teal-400"
          onClick={() => {
            deleteHandler(data.key);
            //fetchHandler();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
