import TodoIcon from "./svgs/todo_svg";
const SideDrawer = (props) => {
    const handleSignOut = props.signoutHandler;
  return (
    <div className="h-2/3 pt-2">
      <div>
        <button className="flex flex-row text-lg font-semibold  w-full p-1">
          <div className="p-1">
            <TodoIcon />
          </div>
          <h2 className="p-1 pl-2">Lists</h2>
        </button>
      </div>
      <div>
        <button className="flex flex-row text-lg font-semibold  w-full p-1">
          <div className="p-1">
            <TodoIcon />
          </div>
          <h2 className="p-1 pl-2">Accounts</h2>
        </button>
      </div>
      <div>
        <button
          onClick={handleSignOut}
          className="w-full flex flex-row text-lg font-semibold  p-1"
        >
          <div className="p-1">
            <TodoIcon />
          </div>
          <h2 className="p-1 pl-2">Logout</h2>
        </button>
      </div>
    </div>
  );
};

export default SideDrawer;
