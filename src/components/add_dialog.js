import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const AddDialog = (props) => {
  const isOpen = props.show;
  const isOpenSetter = props.showSetter;
  //const idItem = props.id;
  const data = props.dataArr;
  const setter = props.arrSetter;
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const auth = getAuth();
  const db = getDatabase();

  const date = new Date();

  return (
    <Dialog open={isOpen} fullWidth={true}>
      <DialogTitle>Add Your TODO Item</DialogTitle>
      <DialogContent>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your title"
            value={title}
            onChange={(val) => {
              settitle(val.target.value);
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
            Body:
          </label>
          <textarea
            required
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlTextarea1"
            rows="10"
            placeholder="Your message"
            value={body}
            onChange={(val) => {
              setbody(val.target.value);
            }}
          ></textarea>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="w-full flex flex-row place-content-between mx-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              isOpenSetter(false);
              settitle("");
              setbody("");
            }}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (title === "" || body === "") {
                return;
              }
              const todoListRef = ref(
                db,
                "users/" + auth.currentUser.uid + "/todoItems"
              );
              const singleItemRef = push(todoListRef);
              set(singleItemRef, {
                title: title,
                body: body,
                time:
                  "" +
                  date.getFullYear() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getDate() +
                  "  " +
                  date.getHours() +
                  ":" +
                  date.getMinutes() +
                  ":" +
                  date.getSeconds(),
              })
                .then(() => {
                  isOpenSetter(false);
                  settitle("");
                  setbody("");
                  //setter(data);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            Add
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
