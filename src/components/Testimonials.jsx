import "../styles/testimonials.css";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    text: "Shree Construction handled our residential project with great precision and quality. From planning to final delivery, everything was smooth and well-managed. The team ensured every detail matched our expectations and delivered a beautiful home.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    rating: 4,
    text: "The interior designing done by Shree Construction is absolutely stunning. They perfectly understood our taste and created a space that feels both modern and comfortable. Every corner reflects creativity and elegance.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Patel",
    rating: 5,
    text: "Their commercial building project for our office was executed flawlessly. The design is modern, functional, and highly efficient. The team maintained professionalism throughout and delivered on time.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Sneha Kapoor",
    rating: 3,
    text: "We hired Shree Construction for infrastructure work, and the results were impressive. The quality of materials and attention to structural strength were clearly visible. Highly reliable for large-scale projects.",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Rohit Singh",
    rating: 4,
    text: "Our residential apartment project was completed with excellent finishing and timely delivery. The team was responsive, professional, and focused on delivering the best outcome. Truly a trustworthy company.",
    img: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Neha Jain",
    rating: 5,
    text: "The interior work exceeded our expectations. From color selection to furniture layout, everything was perfectly planned. The space now feels luxurious and very comfortable to live in.",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Karan Mehta",
    rating: 5,
    text: "Shree Construction delivered our commercial space with excellent planning and execution. The layout is highly functional and looks very professional. Great experience working with their team.",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Pooja Sharma",
    rating: 4,
    text: "Their infrastructure work on roads and site development was handled very efficiently. The quality, durability, and finishing were all top-notch. Definitely a company you can rely on.",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Vikas Gupta",
    rating: 5,
    text: "From residential construction to final detailing, everything was handled with perfection. The team ensured high-quality standards and timely completion. We are extremely satisfied with the results.",
    img: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Guests Say</h2>

      <div className="masonry">
        {reviews.map((review, index) => (
          <div
            className="testimonial-card"
            key={index}
            data-aos="fade-in"
            data-aos-delay={index * 100}
          >
            {/*  ADD HERE */}
            <div className="stars">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p>{review.text}</p>

            <div className="user">
              <img src={review.img} alt="" />
              <h4>{review.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
