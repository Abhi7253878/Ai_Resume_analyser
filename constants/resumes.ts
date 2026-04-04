type Resume = {
  id: string;
  companyName: string;
  jobTitle: string;
  feedback: {
    overallScore: number;
  };
  imagePath: string;
};

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    feedback: { overallScore: 85 },
    imagePath: "/resume_01.png",
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    feedback: { overallScore: 90 },
    imagePath: "/resume_02.png",
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    feedback: { overallScore: 88 },
    imagePath: "/resume_03.png"
  },
];