import Section from "@/components/ui/section";
import Image from "@/components/image/image";
import Card3D from "@/components/ui/3d-card";
import { FlipWords } from "@/components/ui/filp-words";
import VanishingCarousel from "@/components/ui/vanishing-carousel";
import { Button } from "@/components/ui/button";
import { Book, Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  allFeatures,
  FrequentlyAskedQuestions,
  items,
} from "@/constants/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const words = ["Free", "Open-source", "Easy", "Fast"];
  return (
    <>
      <Section>
        <div className="min-h-screen flex justify-center items-center font-medium ">
          <div className="w-1/2">
            <span className="text-zinc-500 text-sm font-semibold tracking-wide">
              Finally,
            </span>
            <h1 className="text-6xl font-bold text-zinc-800">
              A<FlipWords words={words} className="text-zinc-900" />
              <br /> Resume Builder.
              <div className="w-16 h-1 bg-primary mt-2" />
            </h1>
            <p
              className="text-lg text-zinc-600 dark:text-neutral-300 mt-2"
              style={{ maxWidth: "30rem" }}
            >
              A free and open-source resume builder that simplifies the process
              of creating, updating, and sharing your resume.
            </p>
            <div className="flex items-center mt-4">
              <Button>
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button variant="outline" className="ml-2">
                <Link to="/learn-more" className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-4 w-1/2 flex justify-end items-center">
            <Card3D className="w-[90%] shadow-lg shadow-zinc-400">
              <Image
                src={"/resume.jpg"}
                alt="logo"
                className="w-full h-full object-contain object-center"
              />
            </Card3D>
          </div>
        </div>
      </Section>
      <Section fullBackground="bg-slate-50">
        <div>
          <div className="py-6 space-y-4">
            <h4 className="text-xl font-semibold text-zinc-800 uppercase my-2 pt-6">
              Rich in features, simple to use, and free forever.
              <div className="w-16 h-1 bg-primary mt-2" />
            </h4>
            <p className="text-base font-medium text-zinc-600 mt-2 w-1/2 my-2">
              Create a resume that stands out with our easy-to-use resume
              builder. Choose from templates, add your information, and export
              your resume in minutes.
            </p>
            <div>
              <div className="flex flex-wrap">
                {allFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2  text-zinc-800 px-2 py-2 border border-zinc-300 text-sm rounded-md hover:bg-zinc-300 cursor-default m-1"
                    style={{
                      userSelect: "none",
                    }}
                  >
                    <Check className="w-4 h-4 text-zinc-800" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex justify-between py-6">
          <div className="w-2/5">
            <h4 className="text-xl font-semibold text-zinc-800 uppercase my-2 mt-6">
              Templates
              <div className="w-16 h-1 bg-primary mt-2" />
            </h4>
            <p className="text-base font-medium text-zinc-600 mt-2">
              Explore our collection of resume templates to find the perfect one
              for you. They could also serve as examples to help guide the
              creation of your next resume.
            </p>
          </div>
          <VanishingCarousel items={items} className="relative w-3/5" />
        </div>
      </Section>
      <Section>
        <div className="flex justify-between py-6">
          <div className="w-2/5">
            <h4 className="text-xl font-semibold text-zinc-800 uppercase my-2 mt-6">
              Frequently Asked Questions
              <div className="w-16 h-1 bg-primary mt-2" />
            </h4>
            <p className="text-base font-medium text-zinc-600 mt-2">
              Here are some questions I often get asked about the resume
              builder.
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              Unfortunately, this section is available only in English, as I do
              not want to burden translators with having to translate these
              large paragraphs of text.
            </p>
          </div>
          <div className="w-3/5">
            {FrequentlyAskedQuestions.map((faq, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
