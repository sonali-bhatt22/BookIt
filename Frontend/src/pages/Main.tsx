import React from "react";
import { useEffect, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  // add any other fields your mockapi experience has
}

interface MainProps {
  searchQuery: string;
}
const Main: React.FC<MainProps> = ({ searchQuery }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/experiences"
      );
      const data: Experience[] = await response.json();
      console.log(data);
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  return (
    <div className="flex flex-wrap gap-4 py-8">
      {experiences.length > 0 &&
        experiences
          .filter((exp) =>{
            const title = exp?.title?.toLowerCase() || "";
            const query = searchQuery?.toLowerCase() || "";
            return title.includes(query);
          }).map((exp) => <ExperienceCard key={exp._id} experience={exp}/>)}
    </div>
  );
};

export default Main;
