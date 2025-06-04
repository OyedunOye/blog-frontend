import MaxWidth from "../common/MaxWidthWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Subscribe = () => {
  return (
    <section id="subscription" className="w-full bg-[#F3F4F6]">
      <MaxWidth className="flex justify-center content-center w-full h-fit py-2 pb-3 bg-[#F3F4F6] dark:bg-black/60">
        <div className="flex flex-col justify-center py-2 mx-auto gap-2 max-md:gap-4 max-md:w-full">
          <h3 className="font-bold text-xl text-center">
            📬 Subscribe to our newsletter
          </h3>
          <p className="text-md text-slate-600 dark:text-white text-center">
            Read and share new perspectives on just about any topic.
            Everyone&apos;s welcome.👋
          </p>
          <div className="flex justify-center content-center mx-auto w-[80%] max-md:flex-col gap-2">
            <Input
              type="email"
              placeholder="Email"
              className="w-84 flex max-md:w-64"
            />
            <Button
              variant="default"
              className="max-md:justify-self-center flex"
            >
              Sign up
            </Button>
          </div>
          <p className="text-slate-600 text-sm text-center dark:text-white">
            We care about the protection of your data. Read our Privacy Policy.
          </p>
        </div>
      </MaxWidth>
    </section>
  );
};

export default Subscribe;
