const Footer = () => {
  return (
    <div className="bg-white py-4 px-2 mt-5">
      <div className="w-[80%] flex justify-between text-sm mx-auto">
        <div className="flex gap-2">
          <span className="hover:text-[#0DD6B8] cursor-pointer transition-all">
            Privacy Policy
          </span>
          <span className="hover:text-[#0DD6B8] cursor-pointer transition-all">
            Terms of Use
          </span>
        </div>
        <div>
          © 2025 Booksto with By{" "}
          <span className="text-[#0DD6B8]">Eltac Maharramli</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
