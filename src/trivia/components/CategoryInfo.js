import "./CategoryInfo.css";

const CategoryInfo = ({ category, setShowInfo }) => {
  return (
    <div className="info-container">
      <div className="info-body">
        This category was submitted by {category.author}. {category.author} is
        working with leading experts to populate future questions for the site.
      </div>

      <div
        className="close-out"
        onClick={() => {
          setShowInfo(false);
        }}
      >
        x
      </div>
    </div>
  );
};

export default CategoryInfo;
