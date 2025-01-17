"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  const faqData = [
    {
      question: "How is the data stored",
      answer:
        "The data is stored in MYSQL to provide a persistent and seemless experience for the user",
    },
    {
      question: "What data from the school is stored",
      answer:
        "Only what we need for Google OAUTH which includes email address, full name, and profile picture",
    },
    {
      question: "What practices are used to maintain code quality",
      answer:
        "We use ESLINT and Prettier to maintain code consistence and quality, along with using guidelines like converntional commits",
    },
    {
      question: "What about accessbility?",
      answer:
        "Our components are built on top of Radix UI which is highlighy accessbile",
    },
    {
      question: "What about database backups?",
      answer:
        "Our databases are backed up dynamiclly through a python script "
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
