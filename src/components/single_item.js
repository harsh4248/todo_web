const SingleItem = (prop) => {
    const data = prop.singleData;
    const key = prop.id;
    return ( 
        <button className="border mx-4 my-2 text-left hover:bg-gray-500 pl-2" key={key} id={key}>
            <h1 className="text-lg font-semibold pt-2">{data.title}</h1>
            <p className="text-gray-400 text-sm pb-2">{data.time}</p>
            <div className="flex flex-row ">
                <a className="mx-2 text-center hover:text-teal-400">Update</a>
                <a className="mx-2 text-center hover:text-teal-400">Edit</a>
                <a className="mx-2 text-center hover:text-teal-400">Delete</a>
            </div>
        </button>
     );
}
 
export default SingleItem;