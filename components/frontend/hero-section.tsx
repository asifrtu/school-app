// components/HeroSection.js
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-blue-900 leading-tight lg:text-5xl">
            Empowering Students to <span className="text-blue-600">Learn</span> and{' '}
            <span className="text-blue-600">Grow</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your journey to academic excellence starts here. Explore courses, track progress, and connect with teachers in one seamless app.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a href="#features" className="ml-4 text-blue-600 hover:underline">
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <Image
            src="/school-app-hero.png"
            alt="School app preview"
            width={500}
            height={400}
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
}
