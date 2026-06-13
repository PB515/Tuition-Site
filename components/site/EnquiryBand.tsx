import { Phone } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import CtaButton from "./CtaButton";
import FloatingMath from "./FloatingMath";
import { WA_ENQUIRY, SITE } from "@/lib/site";

export default function EnquiryBand({
  heading,
  sub,
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <FloatingMath preset="band" offset={5} count={3} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {heading ?? "Talk to Snehal Sir about your child's math"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          {sub ??
            "Message on WhatsApp or call for batch details and fees. We will help you choose the right batch for your class."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={WA_ENQUIRY} external>
            <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
          </CtaButton>
          <CtaButton href={`tel:${SITE.tel}`} variant="secondary" external>
            <Phone size={18} strokeWidth={2} /> Call Sir
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
