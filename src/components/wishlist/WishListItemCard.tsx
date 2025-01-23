import { MdDelete } from "react-icons/md";
import BasicButton from "../general/Button";

interface WishlistItemCardProps {
  book: any;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ book }) => {
  return (
    <div className="wishlist-item p-2 flex items-center justify-around gap-2">
      <div className="flex justify-center items-center bg-red-600 p-2 rounded-lg w-1/8">
        <MdDelete className="text-white" />
      </div>
      <div className="flex gap-2 items-center w-1/2">
        <img
          src={book?.image || ""}
          alt={book?.book_name || "Book"}
          className="w-24 h-24"
        />
        <div className="w-1/2">
          <h5>{book?.book_name || "Unknown Title"}</h5>
          <div>{book?.inStock ? "In Stock" : "Out of Stock"}</div>
          <p className="mb-0">${book?.price || 0}</p>
        </div>
      </div>
      <div className=" w-1/5">
        <button>-</button>
        <input type="text" name="number" id="number" value={1} readOnly />
        <button>+</button>
      </div>
      <BasicButton text="Add to Cart" />
    </div>
  );
};

export default WishlistItemCard;
