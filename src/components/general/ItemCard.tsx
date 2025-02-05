import { MdDelete } from "react-icons/md";
import BasicButton from "./Button";
import { useCallback, useRef, useState } from "react";

interface ItemCard {
  book: any;
  button?: boolean;
  handleAction?: () => void;
}

const ItemCard: React.FC<ItemCard> = ({ book, button, handleAction }) => {
  const [inputValue, setInputValue] = useState<number>(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const increment = useCallback(() => {
    setInputValue((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setInputValue((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const incrementCounting = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setInputValue((prev) => prev + 1);
      }, 150);
    }
  };

  const decrementCounting = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setInputValue((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            return 1;
          }
        });
      }, 150);
    }
  };

  const stopCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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
        <button
          className="border h-6 flex justify-center items-center px-1 rounded-s bg-slate-100 hover:bg-slate-200 hover:shadow-md transition-all duration-200"
          onClick={decrement}
          onMouseDown={decrementCounting}
          onMouseUp={stopCounting}
          onMouseLeave={stopCounting}
        >
          -
        </button>
        <input
          type="text"
          name="number"
          id="number"
          value={inputValue}
          className="border w-9 flex justify-center items-center h-6 text-center text-sm outline-none hover:shadow-md transition-all duration-200"
          readOnly
        />
        <button
          className="border h-6 flex justify-center items-center px-1 rounded-e bg-slate-100 hover:bg-slate-200 hover:shadow-md transition-all duration-200"
          onClick={increment}
          onMouseDown={incrementCounting}
          onMouseUp={stopCounting}
          onMouseLeave={stopCounting}
        >
          +
        </button>
      </div>
      {button && <BasicButton text="Add to Cart" />}
    </div>
  );
};

export default ItemCard;
