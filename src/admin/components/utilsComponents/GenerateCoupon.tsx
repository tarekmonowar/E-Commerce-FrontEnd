import { Input } from "@/components/ui/input";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

export default function GenerateCoupon() {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols) {
      toast.info("Please Select One At Least");
      setCoupon("");
      return;
    }
    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Coupon Generator
        </h1>

        <section className="max-w-md mx-auto rounded-lg">
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2/3">
                <label
                  htmlFor="prefix"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Prefix
                </label>
                <Input
                  id="prefix"
                  type="text"
                  placeholder="Text to include"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  maxLength={size}
                  className="rounded-[4px] mt-2 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
                />
              </div>

              <div className="w-1/3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Coupon Length
                </label>
                <Input
                  id="size"
                  type="number"
                  placeholder="Coupon Length"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min={8}
                  max={25}
                  className="rounded-[4px] mt-2 border-black/30 dark:border-gray-700 bg-gray-50 xl:text-[15px]"
                />
              </div>
            </div>

            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-sm p-2">
              <legend className="px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Include
              </legend>

              <div className="flex gap-4 items-center justify-center">
                <div className="flex items-center">
                  <Input
                    id="numbers"
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers((prev) => !prev)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label
                    htmlFor="numbers"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Numbers
                  </label>
                </div>

                <div className="flex items-center">
                  <Input
                    id="characters"
                    type="checkbox"
                    checked={includeCharacters}
                    onChange={() => setIncludeCharacters((prev) => !prev)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label
                    htmlFor="characters"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Characters
                  </label>
                </div>

                <div className="flex items-center">
                  <Input
                    id="symbols"
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={() => setIncludeSymbols((prev) => !prev)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                  <label
                    htmlFor="symbols"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Symbols
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600 text-white/80 font-bold text-[18px] mt-4 py-3 cursor-pointer px-4 rounded-sm transition-colors"
            >
              Generate Coupon
            </button>
          </form>

          {coupon && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-sm flex justify-between items-center border-black/30 dark:border-gray-700">
              <code className="font-mono text-lg text-gray-800 dark:text-white break-all">
                {coupon}
              </code>
              <button
                onClick={() => copyText(coupon)}
                className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 cursor-pointer text-blue-800 dark:text-blue-100 text-sm font-medium rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
