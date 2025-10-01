import Navbar from "./component/navbar";
import Hero from "./component/hero";
import Brand from "./component/brandshowcase";
import Feature from "./component/feature";
import Service from "./component/services";
import ScrollStackCards from "./component/stackcard";
import Blog from "./component/blog";
import ScrollTextSection from "./component/ScrollTextSection";
import Footer from "./component/footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen p-3 bg-white">
        <Navbar />
        <Hero />
        <Brand />
        <Feature />
        <Service />
        <ScrollStackCards />
        <Blog />
        <ScrollTextSection />
        <Footer />
      </div>
    </>
  );
}
