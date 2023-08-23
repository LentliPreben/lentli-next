import { Title, Image, Link } from 'components'

const CategoryView = (props) => {
  const { name, imageUrl, _id } = props

  const href = _id ? `/categories/${_id}/products` : '/categories'

  return (
    <Link href={href}>
      <div className="category-advanced-view">
        <div className="image-wrapper">
          <Image
            overlay={
              <Title inverse center as="h6">
                {name}
              </Title>
            }
            src={imageUrl}
            alt={name}
          />
        </div>
      </div>
    </Link>
  )
}

export default CategoryView
