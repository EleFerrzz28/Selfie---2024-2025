
const DropdownMenu = ({ categories = [], selectedCategory, setSelectedCategory }) => {
  return (
    <ul className="dropdown__list dropdown-menu">
      <li>
        <button
          className={`dropdown__category dropdown-item ${selectedCategory === 'all' ? 'active' : ''
            }`}
          onClick={() => setSelectedCategory('all')}>
          All
        </button>
      </li>
      {categories.map((cat) => (
        <li key={cat._id}>
          <button
            className={`dropdown__category dropdown-item ${selectedCategory === cat._id ? 'active' : ''
              }`}
            onClick={() => setSelectedCategory(cat._id)} >
            <span
              style={{
                backgroundColor: cat.color,
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: '8px',
              }}/>
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;