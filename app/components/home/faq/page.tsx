import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FrequentAskedQuestions (){
    return(
        <>
            {/* FAQ Section */}
        <section className="py-12 bg-gray-100">
          <div className="container px-4">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
                  },
                  {
                    question: "How long does product shipping take?",
                    answer:
                      "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location.",
                  },
                  {
                    question: "Can I track my Loan application?",
                    answer:
                      "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your package's progress. You can also track your order from your account dashboard.",
                  },
                  {
                    question: "Do you offer international shipping?",
                    answer:
                      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination.",
                  },
                  {
                    question: "Can I track my order?",
                    answer:
                      "Yes, once your order ships, you'll receive a tracking number via email that you can use to monitor your package's progress. You can also track your order from your account dashboard.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5e3a]/10 text-[#ff5e3a]">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        </>
    )
}