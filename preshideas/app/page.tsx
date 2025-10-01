import Navbar from "./component/navbar";
import Hero from "./component/hero";
import Brand from "./component/brandshowcase";
import Feature from "./component/feature";
import Service from "./component/services";

export default function Home() {
  return (
    <>
      <div className="min-h-screen p-3 bg-white">
        <Navbar />
        <Hero />
        <Brand />
        <Feature />
        <Service />
      </div>
    </>
  );
}
