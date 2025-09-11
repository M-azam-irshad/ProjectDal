function AllProjectsList({formData}) {
  return (
    <div>
      <h2>All Projects</h2>
      <ul>
        <li>{formData.title}</li>
        <li>{formData.description}</li>
        <li>{formData.category}</li>
        <li>{formData.targetAudience}</li>
        <li>{formData.tags.join(', ')}</li>
      </ul>
    </div>
  );
}

export default AllProjectsList;