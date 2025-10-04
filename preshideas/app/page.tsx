
import Hero from "./component/hero";
import Brand from "./component/brandshowcase";
import Feature from "./component/feature";
import Service from "./component/services";
import ScrollStackCards from "./component/stackcard";
import Blog from "./component/blog";
import ScrollTextSection from "./component/ScrollTextSection";

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <Hero />
        <Brand />
        <Feature />
        <Service />
        <ScrollStackCards />
        <Blog />
        <ScrollTextSection />
      </div>
    </>
  );
}
