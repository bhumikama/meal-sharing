import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-96 mb-10">
        <Image
          src="/about_us.jpg"
          alt="Community enjoying a meal together"
          layout="fill"
          objectFit="cover"
          className="rounded-lg opacity-60"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white bg-gradient-to-t from-black via-transparent to-black
"
        >
          <h1 className="text-5xl font-bold text-center">About Us</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-[#202125] mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            At MealShare, we believe food brings people together. Our mission is
            to create a community where people share homemade meals, reduce food
            waste, and build connections that matter.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "fa-utensils",
              text: "Reduce food waste by encouraging meal sharing",
            },
            {
              icon: "fa-users",
              text: "Promote cultural diversity through culinary experiences",
            },
            {
              icon: "fa-handshake",
              text: "Foster meaningful connections within communities",
            },
            {
              icon: "fa-recycle",
              text: "Support local food economies and sustainable practices",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:scale-105 hover:bg-[#eaf7fc] transition duration-300 ease-in-out"
            >
              <i
                className={`fas ${item.icon} text-4xl text-[#29ade5] mb-4`}
              ></i>
              <p className="text-center text-lg text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-[#202125] mb-4">
            Our Values
          </h2>{" "}
          {/* Wolt Blue */}
          <p className="text-lg text-gray-600 mt-2">
            Our values are the foundation of MealShare. They guide us in
            fostering a strong, connected, and sustainable community through
            meal sharing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Card 1 - Community */}
          <div className="w-full sm:w-72 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#29ade5] mb-4">
              Community
            </h3>{" "}
            {/* Wolt Blue */}
            <p className="text-gray-600 text-base">
              We build communities by sharing home-cooked meals and fostering
              connections between neighbors.
            </p>
          </div>

          {/* Card 2 - Sustainability */}
          <div className="w-full sm:w-72 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#29ade5] mb-4">
              Sustainability
            </h3>{" "}
            {/* Wolt Blue */}
            <p className="text-gray-600 text-base">
              We are committed to reducing food waste and supporting sustainable
              practices in our food-sharing ecosystem.
            </p>
          </div>

          {/* Card 3 - Diversity */}
          <div className="w-full sm:w-72 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#29ade5] mb-4">
              Diversity
            </h3>
            {/* Wolt Blue */}
            <p className="text-gray-600 text-base">
              We celebrate the richness of cultures through food and encourage
              the sharing of diverse culinary traditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
