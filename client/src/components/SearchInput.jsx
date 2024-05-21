export default function SearchInput() {
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control rounded"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Search</label>
      </div>
    </>
  );
}
