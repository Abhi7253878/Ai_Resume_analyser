import type { Route } from "./+types/home";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import Navbar from "../navbar";
import ResumeCard from "../components/ResumeCard";
import { resumes as resumeData } from "../../constants/resumes"; // ✅ FIXED

type KVItem = {
  key: string;
  value: string;
};

type Resume = {
  id: string;
  title?: string;
  createdAt?: string;
  [key: string]: any;
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
      const kvClient = (globalThis as any).kv;
      if (!kvClient) {
        setResumes(resumeData); // ✅ FIXED (use imported data)
        setLoadingResumes(false);
        return;
      }
      const items = (await kvClient.list('resume:*', true)) as KVItem[];
      const parsedResumes = items?.map((item) => JSON.parse(item.value) as Resume) ?? [];
      setResumes(parsedResumes.length ? parsedResumes : resumeData); // ✅ FIXED
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

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-50" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
           
          </div>
        )}
      </section>
      
    </main>
  );
}