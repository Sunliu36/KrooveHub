import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjusts height to fill the full viewport
      }}
    >
      <SignIn path="/sign-in" />
    </div>
  );
}
