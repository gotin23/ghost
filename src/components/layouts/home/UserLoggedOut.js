import Title from "../../Title/Title";
import Button from "../../Button/Button";
import Link from "next/link";

const home = () => {
  return (
    <div className="min-h-[400px]">
      <Title level={1} text="Ghost" style="text-9xl text-primary" />
      <p className="text-primary text-right">Streaming service platform.</p>
      <div className="flex  justify-between mt-10">
        <Link href={"/login"}>
          <Button type={"button"} text={"Login"} />
        </Link>
        <Link href={"/login"}>
          <Button type={"button"} text={"Sign Up"} />
        </Link>
      </div>
    </div>
  );
};

export default home;
