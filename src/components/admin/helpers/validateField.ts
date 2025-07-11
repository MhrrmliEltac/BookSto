export const validateBook = (book: any) => {
  const requiredFields = [
    "author",
    "book_name",
    "description",
    "genre",
    "image",
  ];
  const areValid = requiredFields.every(
    (key) => book[key as keyof typeof book]?.trim() !== ""
  );
  return areValid && book.price > 0;
};
