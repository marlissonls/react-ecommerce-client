type ProductInfoProps = {
  title: string;
  description: string;
};

function ProductInfo({ title, description }: ProductInfoProps) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
        Produto
      </span>

      <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#272B28] sm:text-3xl">
        {title}
      </h1>

      <div className="mt-7">
        <h2 className="text-sm font-semibold text-[#272B28]">
          Descrição
        </h2>

        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#747A74]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;