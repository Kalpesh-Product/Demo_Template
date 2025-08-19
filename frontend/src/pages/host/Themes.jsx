import { useNavigate } from "react-router-dom";
import GetStartedButton from "../../components/GetStartedButton";
import Container from "../../components/Container";
import MySeperator from "../../components/MySeperator";

const themes = [
  {
    src: "/hosts/themes/biznest.png",
    mockup: "/hosts/themes/biznestProduct.png",
    alt: "BiznestImage",
    tag: "co-working",
  },
  {
    src: "/hosts/themes/coworkingMewo.png",
    mockup: "/hosts/themes/coworkingMewoProduct.png",
    alt: "CoWorkingMewo",
    tag: "co-working",
  },
  {
    src: "/hosts/themes/coworking.png",
    mockup: "/hosts/themes/coworkingProduct.png",
    alt: "Co-Working Image",
    tag: "co-working",
  },
  {
    src: "/hosts/themes/boutique.png",
    mockup: "/hosts/themes/boutiqueProduct.png",
    alt: "Boutique Image",
    tag: "boutique",
  },
  {
    src: "/hosts/themes/coliving.png",
    mockup: "/hosts/themes/colivingProduct.png",
    alt: "Co-Living Image",
    tag: "co-living",
  },
  {
    src: "/hosts/themes/coworking2.png",
    mockup: "/hosts/themes/coworkingNomadProduct.png",
    alt: "CoLivingImage_2",
    tag: "co-working",
  },
  {
    src: "/hosts/themes/coworking3.png",
    mockup: "/hosts/themes/coworking3Product.png",
    alt: "CoLivingImage_3",
    tag: "co-working",
  },
  {
    src: "/hosts/themes/cafe2.png",
    mockup: "/hosts/themes/cafe2Product.png",
    alt: "Cafe_2",
    tag: "cafe",
  },
  {
    src: "/hosts/themes/cafe3.png",
    mockup: "/hosts/themes/cafe3Product.png",
    alt: "Cafe_3",
    tag: "cafe",
  },
  {
    src: "/hosts/themes/hostels.png",
    mockup: "/hosts/themes/hostelsProduct.png",
    alt: "Hostels",
    tag: "hostels",
  },
];

const themeWebsiteGridData = [
  {
    title: "Faster loading",
    description: "WoNo is designed for performance so your site loads faster",
  },
  {
    title: "Built with SEO in mind",
    description:
      "Get the SEO capabilities you need to optimize your site for search visibility.",
  },
  {
    title: "Enterprise-grade security",
    description: "We keep your site and visitors data protected, 24/7.",
  },
  {
    title: "Resilient infrastructure",
    description:
      "Multi-cloud hosting ensures 99.9% uptime, even during traffic spikes.",
  },
  {
    title: "Accessible for everyone",
    description:
      "Make your own website inclusive with built-in accessibility tools.",
  },
  {
    title: "Easy customization",
    description:
      "Personalize your website effortlessly by using  customizable templates.",
  },
];

const supportItems = [
  {
    title: "Get answers",
    description:
      "Watch tutorials and read detailed articles in Wono help center",
    linkText: "Go to FAQ →",
    path: "/hosts/faq",
  },
  {
    title: "Contact Us",
    description:
      "Get support by chat or schedule a call with a Customer Care Expert",
    linkText: "Connect With us →",
    path: "/hosts/contact",
  },
  {
    title: "Hire a pro",
    description: "Get help at any stage -- from site creation to online growth",
    linkText: "Browse all services →",
    path: "/hosts/modules",
  },
];

const Themes = () => {
  const navigate = useNavigate();
  return (
    <div className="   text-secondary-dark justify-center items-center">
      <Container>
        <section className="flex flex-col items-end justify-center gap-4 leading-[1.3] text-secondary-dark ">
          <h1 className="text-[clamp(1.62rem,4.6vw,4.5rem)] font-medium">
            Choose the best Responsive Website Theme for your business
          </h1>

          <GetStartedButton handleSubmit={()=>navigate('/hosts/signup')}/>
        </section>
      </Container>

      {/*Top Recommendations */}
      <section className="w-full bg-gray-100 flex flex-col justify-center items-center gap-8">
        <Container>
          <div className="space-y-12">
            <div>
              <h1 className="text-[clamp(2rem,2.5vw,5rem)] font-medium pb-2">
                Top Theme Recommendations
              </h1>
              <span className="text-[clamp(1rem,1.8vw,3rem)]">
                Cherry pick features or ask us to customize anything for your
                business growth. Fully tech ready, integrated and responsive.
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 ">
              {themes.map((image, index) => (
                <div
                  data-aos="fade-up"
                  className="w-full h-full overflow-hidden rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                  onClick={() => navigate("products", { state: { image } })}
                  key={index}>
                  <img
                    className="rounded-xl w-full h-full object-cover transition-transform duration-500 ease hover:scale-[1.2] cursor-pointer origin-center"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <GetStartedButton handleSubmit={()=>navigate('/hosts/signup')} />
            </div>
          </div>
        </Container>
      </section>

      {/*Customize */}
      <section>
        <Container>
          <div className="flex lg:flex-nowrap flex-wrap justify-between items-center gap-8">
            <div className="flex flex-col gap-16 w-full lg:w-[50%]">
              <div className="text-[clamp(2rem,4.2vw,6rem)] md:text-[clamp(2rem,8vw,8rem)] lg:text-[clamp(2rem,4.2vw,6rem)] leading-none">
                <h1 className="font-normal">Customize it <br className="hidden lg:block"/> your way</h1>
              </div>
              <ul className="flex flex-col gap-2">
                <li>1000's advanced web capabilities</li>
                <li>Intuitive drag and drop website editor</li>
                <li>Powerful AI features for smart customization</li>
                <li>Full-stack web dev tools for custom functionality</li>
              </ul>
              <div className="flex justify-center md:justify-start w-full">
                <GetStartedButton handleSubmit={()=>navigate('/hosts/signup')}/>
              </div>
            </div>
            <div className="w-full lg:w-[50%] h-full">
              <img
                src="/hosts/themes/biznestMockUp.png"
                alt="Biznest MockUp"
                className="w-full h-full"
              />
            </div>
          </div>
        </Container>
      </section>
         <MySeperator />
      {/*Website Builder */}
      <Container>
        <div className="flex flex-col justify-between items-center gap-14">
          <div className="text-[clamp(2rem,4.3vw,4.5rem)] md:text-[clamp(2rem,7vw,8rem)] lg:text-[clamp(2rem,4.3vw,4.5rem)] w-full lg:w-[70%] self-start leading-[1.2]">
            <h1 className="font-normal">
              A website builder engineered for growth
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-x-20">
            {themeWebsiteGridData.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 lg:gap-6">
                <h4 className="text-[1.3rem] lg:text-[1.3rem] font-medium">{item.title}</h4>
                <p className="text-content">{item.description}</p>
              </div>
            ))}
          </div>
          <div>
            <GetStartedButton handleSubmit={()=>navigate('/hosts/signup')}/>
          </div>
        </div>
      </Container>

      <MySeperator />

      {/*We're here*/}
      <Container>
        <section className="flex flex-col justify-between items-center  gap-10 mb-10">
          <div className="text-[clamp(2rem,4vw,5rem)] md:text-[clamp(2rem,6.8vw,7rem)] lg:text-[clamp(2rem,4vw,5rem)] w-full lg:w-[70%] self-start leading-[1.2]">
            <h1 className="font-normal">We're here for you</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {supportItems.map((item, index) => (
              <div
                className="flex flex-col gap-8 border-t-2 border-black pt-10"
                key={index}>
                <h2 className="font-medium text-content">{item.title}</h2>
                <p>{item.description}</p>
                <span
                  className="cursor-pointer font-semibold underline hover:no-underline underline-offset-8 transition-hover duration-500 ease max-w-fit"
                  onClick={() => {
                    navigate(item.path);
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}>
                  {item.linkText}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Themes;
