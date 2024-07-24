import Button from "./Button";

export default function AdminPage() {
  return (
    <div>
      <Button to="questions" type="dark">
        Questions
      </Button>
      <Button to="stats" type="dark">
        Users Stats
      </Button>
    </div>
  );
}
