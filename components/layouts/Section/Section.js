const Section = (props) => {
  const { children, ...rest } = props

  // this component must be universal
  return (
    <section {...rest}>
      <div className="container">{children}</div>
    </section>
  )
}

export default Section
