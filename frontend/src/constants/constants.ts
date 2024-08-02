export const items = [
  {
    title: "Template 1",
    description: "A simple and clean resume template.",
    image: "/template1.jpg",
  },
  {
    title: "Template 2",
    description: "A modern and stylish resume template.",
    image: "/template2.jpg",
  },
  {
    title: "Template 3",
    description: "A creative and unique resume template.",
    image: "/template3.jpg",
  },
];

export const FrequentlyAskedQuestions = [
  {
    question: "What is the purpose of this application?",
    answer:
      "The purpose of this application is to provide users with a comprehensive tool for managing their tasks efficiently and effectively.",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, simply sign up for an account, and you can begin adding and managing your tasks right away.",
  },
  {
    question: "Can I use this application on multiple devices?",
    answer:
      "Yes, you can access your account and manage your tasks from any device with an internet connection.",
  },
  {
    question: "What features does this application offer?",
    answer:
      "This application offers a variety of features including task management, reminders, collaboration tools, and customizable settings.",
  },
  {
    question: "Is customer support available?",
    answer:
      "Yes, our customer support team is available 24/7 to assist you with any questions or issues you may have.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, you can export your data in various formats for backup or transfer purposes.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, we offer a mobile app that is available for both iOS and Android devices.",
  },
];

export const allFeatures = [
  "Free,Forever",
  "Open-source",
  "Easy to use",
  "Fast",
  "Customizable",
  "Export to PDF",
  "Shareable",
  "Responsive",
  "No sign-up required",
  "No ads",
  "No tracking",
  "No data collection",
  "No hidden fees",
  "No watermarks",
  "No limitations",
  "No premium features",
  "No subscription",
  "No account required",
  "No internet required",
  "No installation required",
  "No download required",
  "No registration required",
  "No email required",
  "No personal information required",
  "No credit card required",
  "No payment required",
  "No hidden costs",
  "No strings attached",
];

export type FAQ = (typeof FrequentlyAskedQuestions)[number];

export type Feature = (typeof allFeatures)[number];

export type Item = (typeof items)[number];
