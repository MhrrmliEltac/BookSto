import { MdDelete } from "react-icons/md";
import BasicButton from "./Button";

interface ItemCard {
  book: any;
  button?: boolean;
  handleAction?: () => void;
}

const ItemCard: React.FC<ItemCard> = ({ book, button, handleAction }) => {
  return (
    <div className="wishlist-item p-2 flex items-center gap-5">
      <div
        onClick={handleAction}
        className="flex justify-center cursor-pointer items-center bg-red-600 p-2 rounded-lg w-1/8"
      >
        <MdDelete className="text-white" />
      </div>
      <div className="flex gap-2 items-center w-1/2">
        <img
          src={book?.image || ""}
          alt={book?.book_name || "Book"}
          className="md:w-24 sm:w-20 w-10"
          loading="lazy"
        />
        <div className="w-full md:w-1/2">
          <h5 className="md:text-lg text-[12px]">
            {book?.book_name || "Unknown Title"}
          </h5>
          <div className="text-xs md:text-lg">
            {book?.inStock ? "In Stock" : "Out of Stock"}
          </div>
          <p className="mb-0">${book?.price || 0}</p>
        </div>
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <button className="border h-6 flex justify-center items-center px-1">
          -
        </button>
        <input
          type="text"
          name="number"
          id="number"
          value={1}
          readOnly
          className="border w-7 flex justify-center items-center h-6 text-center"
        />
        <button className="border h-6 flex justify-center items-center px-1">
          +
        </button>
      </div>
      {button && <BasicButton text="Add to Cart" />}
    </div>
  );
};

export default ItemCard;
