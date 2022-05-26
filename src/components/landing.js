import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import SlideNavIcon from "./svgs/slide_nav_icon";

import SideDrawer from "./side_drawer";
import SingleItem from "./single_item";
import AddDialog from "./add_dialog";

const Landing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [showAddDialog, setshowAddDialog] = useState(false);
  //const [idSet, setIdSet] = useState(new Set());

  const data = [
    {
      title: "Lorem ipsum dolor sit amet.",
      time: "11/12/2022",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia dolorem doloribus aliquid incidunt earum eum minus ipsa esse? Nobis quia id ex corrupti explicabo!",
      
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      time: "11/12/2022",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia dolorem doloribus aliquid incidunt earum eum minus ipsa esse? Nobis quia id ex corrupti explicabo!",
      
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      time: "11/12/2022",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia dolorem doloribus aliquid incidunt earum eum minus ipsa esse? Nobis quia id ex corrupti explicabo!",
      
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      time: "11/12/2022",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quia dolorem doloribus aliquid incidunt earum eum minus ipsa esse? Nobis quia id ex corrupti explicabo!",
      
    },
  ];
  const [todoDataArr, settodoDataArr] = useState([]);
  //const data = [];

  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    } else {
      let dbRef = ref(db, "users/" + auth.currentUser.uid + "/firstName");
      onValue(dbRef, (firstName) => {
        const val = firstName.val();
        setfirstName(val);
      });
      dbRef = ref(db, "users/" + auth.currentUser.uid + "/lastName");
      onValue(dbRef, (lastName) => {
        const val = lastName.val();
        setlastName(val);
      });
      const todoItemsRef = ref(
        db,
        "users/" + auth.currentUser.uid + "/todoItems"
      );
      onValue(todoItemsRef, (snapshot) => {
        const temp = []
        snapshot.forEach((child)=> {
          const value = child.val();
          const title = value.title;
          const body = value.body;
          const time = value.time;
          const singleItem = {
            title : title,
            body : body,
            time : time,
          }
            temp.push(singleItem);
        })
        settodoDataArr(temp);
      });
    }
  }, [db, auth.currentUser,navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //signout successfull
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        //signout not successfull
      });
  };
  return (
    // <div>
    //     {auth.currentUser !== null ?<div>{firstName}</div>:<div></div>}

    //   <button
    //     className="uppercase m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //     onClick={handleSignOut}
    //   >
    //     Sign out
    //   </button>
    // </div>
    <section className="h-screen w-screen flex flex-col">
      <div className="">
        <nav className="fixed w-full bg-teal-500 flex-row flex place-content-between top-0">
          <div className="md:text-lg sm:text-base lg:text-xl p-2 text-white">
            <p>TODO List</p>
          </div>
          <div className="mt-1 lg:hidden">
            <button>
              <SlideNavIcon />
            </button>
          </div>
        </nav>
      </div>
      <div
        className="w-full    mt-11 flex flex-row md:hidden sm:hidden lg:flex "
        style={{ height: "92vh" }}
      >
        <div className="w-2/12 h-full shadow-sm border bg-yellow-50">
          <div className="h-1/3  flex flex-col pt-4 pl-4 pr-4">
            <img
              className="rounded-full w-4/5 h-4/5 bg-red-900 m-auto"
              alt="Profile"
            />
            <p className="capitalize lg:text-xl text-lg font-semibold text-center py-2">
              {firstName + " " + lastName}
            </p>
          </div>
          <hr className="border-gray-500" />
          <div className="">
            <SideDrawer signoutHandler={handleSignOut} />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="absolute bottom-0 right-0 h-16 w-16 p-2">
            <button
              className="bg-teal-500 h-10 w-10 text-white text-sm rounded-full hover:bg-teal-600 shadow"
              onClick={() => {
                if (showAddDialog === false) setshowAddDialog(true);
              }}
            >
              Add
            </button>
          </div>
          <AddDialog
            show={showAddDialog}
            showSetter={setshowAddDialog}
            id={todoDataArr.length}
          />
          {todoDataArr.length === 0 ? (
            <div className="flex h-full center bg-gray-200 ">
              {" "}
              <p className="m-auto text-2xl">
                Please add your list using below button
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 grid-rows-4 p-2 h-full overflow-scroll">
              {todoDataArr.map((val, valIdx) => {
                return (
                  <SingleItem
                    singleData={val}
                    id={valIdx}
                    dataArr={data}
                    arrSetter={settodoDataArr}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
