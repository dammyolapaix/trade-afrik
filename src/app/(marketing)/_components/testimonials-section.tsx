import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Textile Artisan, Nigeria",
    image: "/images/person-1.jpg",
    quote:
      "Since joining TradeAfrik, my handwoven textiles are now shipping to customers in Europe and North America. My revenue has increased by 300% in just six months.",
  },
  {
    name: "Kwame Mensah",
    role: "Woodcraft Cooperative, Ghana",
    image: "/images/person-2.jpg",
    quote:
      "The Pro plan has been a game-changer for our cooperative. The priority listings and marketing support have connected us with high-value buyers from Asia and Australia.",
  },
  {
    name: "Fatima Diallo",
    role: "Skincare Products, Senegal",
    image: "/images/person-3.jpg",
    quote:
      "The analytics dashboard helped me understand which products were most popular in different regions, allowing me to optimize my inventory and increase my conversion rate by 45%.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Success Stories from Our Sellers
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from businesses that have expanded globally with our
              platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    width={60}
                    height={60}
                    alt={`${testimonial.name}'s profile picture`}
                    className="rounded-full w-12 h-12"
                  />
                  <div>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
