import type { Route } from "./+types/home";
import { useNavigate } from "react-router"; // ✅ removed unused Link
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import ResumeCard from "../components/ResumeCard";
import { resumes as resumeData } from "../../constants/resumes";

type KVItem = {
  key: string;
  value: string;
};

/* ✅ FIX 1: Add missing Resume type */
type Resume = {
  id: string;
  companyName: string;
  jobTitle: string;
  feedback: {
    overallScore: number;
  };
  imagePath: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      /* ✅ FIX 2: safer optional chaining */
      const kvClient = (globalThis as any)?.kv;

      if (!kvClient) {
        setResumes(resumeData);
        setLoadingResumes(false);
        return;
      }

      const items = (await kvClient.list("resume:*", true)) as KVItem[];

      const parsedResumes =
        items?.map((item) => JSON.parse(item.value) as Resume) ?? [];

      setResumes(parsedResumes.length ? parsedResumes : resumeData);

      setLoadingResumes(false);
    };

    loadResumes();
  }, []);
  

  return (
    <main className="bg-[url('/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>

          {!loadingResumes && resumes.length === 0 && (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
{/* <img
src="./resume_01.png"
alt="aa"
/> */}
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            {/* ✅ FIX 3: correct Tailwind width */}
            <img src="/resume-scan-2.gif" className="w-40" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
<ResumeCard key={resume.id} resume={resume} />            ))}
          </div>
        )}
        

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4"></div>
        )}
      </section>
    </main>
  );
}