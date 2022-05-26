import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@material-ui/core";
  import { useState } from "react";
  const UpdateDialog = (props) => {
    const isOpen = props.isOpen;
    const isOpenSetter = props.isOpenSetter;
    const data = props.data;
    const [title, settitle] = useState(data.title);
    const [body, setbody] = useState(data.body);
    return (
      <Dialog open={isOpen} fullWidth={true}>
        <DialogTitle>Update Your TODO Item</DialogTitle>
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
          <div className="w-full content-center mx-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                isOpenSetter(false);
                
              }}
            >
              Save
            </button>
          </div>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default UpdateDialog;
  