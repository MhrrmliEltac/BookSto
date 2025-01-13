interface Writer {
  image: string;
  id: number;
  writer_name: string;
  publish_books: number;
}

const FeaturedWriter = ({ writerData }: { writerData: Writer[] | null }) => {
  return (
    <div className="flex flex-wrap overflow-auto md:gap-0 gap-3">
      {writerData &&
        writerData?.map((writer) => (
          <div
            className="flex flex-wrap my-2 gap-4 items-center md:w-[50%] w-full "
            key={writer.id}
          >
            <div>
              <img className="size-16 rounded-full" src={writer.image} alt="" />
            </div>
            <div>
              <p className="mb-0 font-medium">{writer.writer_name}</p>
              <div className="text-[#8599A2] text-sm">
                <span>Publish books:</span>
                <span className="font-bold"> {writer.publish_books}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FeaturedWriter;
