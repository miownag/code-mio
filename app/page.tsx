"use client";

import HeroSection from "@/app/_components/hero-section";
import ExperienceSection from "@/app/_components/experience-section";
import MomentsSection from "@/app/_components/moments-section";
import PostsSection from "@/app/_components/posts-section";
import ProjectsSection from "@/app/_components/projects-section";
import PhotosSection from "@/app/_components/photos-section";
import Footer from "@/app/_components/footer";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-36 pb-8 max-w-6xl">
      <HeroSection />
      <ExperienceSection />
      <MomentsSection />
      <PostsSection />
      <ProjectsSection />
      <PhotosSection />
      <Footer />
    </div>
  );
}
