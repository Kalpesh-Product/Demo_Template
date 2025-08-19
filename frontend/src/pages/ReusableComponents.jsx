import React from "react";
import Container from "../components/Container";
import ReviewCard from "../components/ReviewCard";

const ReusableComponents = () => {
  const mockReviews = [
    {
      name: "Aayushi",
      avatar: "https://i.pravatar.cc/50?img=1",
      duration: "3 years on Airbnb",
      stars: 5,
      date: "2 days ago",
      message:
        "One of the best Airbnbs I’ve stayed at. Loved everything about it, from the stay, to the helpful staff at the place, Bhaskar, to the thoughtfulness they’ve put behind...",
    },
    {
      name: "Vinay",
      avatar: "https://i.pravatar.cc/50?img=2",
      duration: "3 years on Airbnb",
      stars: 5,
      date: "2 weeks ago",
      message:
        "Our caretaker Bhaskar was really responsive and helped a lot. The stay itself is quite good and peaceful. It’s quite secured and we loved the views as well. Good neighborhood...",
    },
    {
      name: "Ankush",
      avatar: "https://i.pravatar.cc/50?img=3",
      duration: "New to Airbnb",
      stars: 5,
      date: "2 weeks ago",
      message:
        "My recent Airbnb stay was absolutely wonderful, thanks to the incredibly helpful host and staff. They were always available and went above and beyond to assist with anything...",
    },
    {
      name: "Irine",
      avatar: "https://i.pravatar.cc/50?img=4",
      duration: "2 years on Airbnb",
      stars: 5,
      date: "April 2025",
      message:
        "The stay was comfortable and had everything we needed. The kitchen was well-equipped with all utensils, making things very convenient. We also received room service...",
    },
  ];
  return (
    <Container>
      <div>
        <h2 className="text-lg">Reviews Component</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <h2>Rating Metrics component</h2>
      </div>
    </Container>
  );
};

export default ReusableComponents;
