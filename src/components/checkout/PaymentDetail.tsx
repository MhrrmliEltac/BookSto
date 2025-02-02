interface TotalPrice {
  totalPrice: number;
}

const PaymentDetail: React.FC<TotalPrice> = ({ totalPrice }) => {
  return (
    <div className="flex justify-between items-center text-2xl p-4">
      <p className="font-bold">Total price:</p>
      <span className="text-[#0DD6B8] font-bold">{totalPrice}$</span>
    </div>
  );
};

export default PaymentDetail;
