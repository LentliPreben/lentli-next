import RCSlider from 'rc-slider'

const Slider = (props) => {
  return (
    <div className="slider-wrapper">
      <RCSlider range {...props} />
    </div>
  )
}
export default Slider
