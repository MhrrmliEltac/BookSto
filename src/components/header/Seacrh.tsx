import { CiSearch } from "react-icons/ci";
const Seacrh = () => {
  return (
    <>
      <div className="relative items-center md:flex hidden">
        <CiSearch className="text-black absolute left-2" size={20} />
        <input
          type="search"
          name="search"
          id="search"
          className="flex items-center rounded-sm px-8 py-2 bg-[#FAFAFA] outline-none"
          placeholder="Search..."
        />
      </div>
    </>
  );
};

export default Seacrh;
