import { Link } from "react-router";
import ScoreCircle from "./components/scorecircle";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: any) => {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-300 block p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
    >
      
      <div className="resume-card-header flex justify-between items-start gap-4">
        
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold break-words">
            {companyName}
          </h2>

          <h3 className="text-gray-500 text-lg break-words">
            {jobTitle}
          </h3>
        </div>

        <div className="flex-shrink-0">
          
          <ScoreCircle score={feedback?.overallScore ?? 0} />
        </div>

      </div>

      <div className="gradient-border animate-in fade-in duration-1000 mt-4">
        <div className="w-full h-full overflow-hidden rounded-lg">
          
          <img
            src={imagePath || "/images/default-resume.png"}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />

        </div>
      </div>

    </Link>
  );
};

export default ResumeCard;