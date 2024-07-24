import Button from "../components/Button";

export default function HomePage() {
  return (
    <div className="mb-5 d-flex flex-column align-items-center">
      <div className="h2 p-2 text-dark">
        Welcome to our React quiz compition.
      </div>
      <div>
        <form className="input-group">
          <input
            placeholder="Enter your email"
            className="border-0 rounded p-2"
          />
          <Button to={"/auth/register"} type="success">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
