import UnlimitedDots from './ProductCharacteristics.styles'

const ProductCharacteristics = (props) => {
  const { characteristic } = props

  return (
    <div className="row gap-8">
      {characteristic?.map(({ name, value }) => (
        <div className="col-12" key={name}>
          <div className="row">
            <div className="col-auto">{name}</div>
            <div className="col flex-1">
              <UnlimitedDots />
            </div>
            <div className="col-6 col-md-5 col-xl-7">{value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCharacteristics
