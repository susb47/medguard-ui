import { Mail, Globe, GraduationCap, BookOpen, Github, Linkedin, Building2, Stethoscope, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- TYPES ---
interface TeamMember {
  name: string;
  role: string;
  designation?: string;
  affiliation: string;
  email?: string;
  portfolio?: string;
  scholar?: string;
  researchgate?: string;
  github?: string;
  linkedin?: string;
  image?: string; // Path to image in /public folder
}

interface DoctorProfile {
  name: string;
  designation: string;
  qualifications: string[];
  regNo: string;
  hospital: string;
  image?: string; // Path to image in /public folder
}

// --- DATA ---
const SUPERVISORS: TeamMember[] = [
  {
    name: "Md. Sadekur Rahman",
    role: "Supervisor",
    designation: "Assistant Professor",
    affiliation: "Department of CSE, Daffodil International University",
    email: "sadekur.cse@daffodilvarsity.edu.bd",
    portfolio: "https://faculty.daffodilvarsity.edu.bd/profile/cse/sadek.html",
    scholar: "https://scholar.google.com/citations?user=BTlrl1oAAAAJ&hl=en",
    researchgate: "https://www.researchgate.net/profile/Md-Rahman-571",
    image: "/team/sadekur.jpg", // Add this file to public/team/
  },
  {
    name: "Shah Md. Tanvir Siddiquee",
    role: "Co-Supervisor",
    designation: "Assistant Professor",
    affiliation: "Department of CSE, Daffodil International University",
    email: "tanvir.cse@diu.edu.bd",
    portfolio: "https://faculty.daffodilvarsity.edu.bd/profile/cse/shah-md-tanvir.html",
    researchgate: "https://www.researchgate.net/profile/Shah-Siddiquee-2",
    image: "/team/tanvir.jpg", // Add this file to public/team/
  },
  {
    name: "Md Hassan Imam Bijoy",
    role: "Mentor",
    designation: "Lecturer",
    affiliation: "Department of CIS, Daffodil International University",
    email: "bijoy.cse0411.c@diu.edu.bd",
    portfolio: "https://sites.google.com/view/hibijoy",
    scholar: "https://scholar.google.com/citations?user=JvfGLIMAAAAJ&hl=en",
    researchgate: "https://www.researchgate.net/profile/Md-Hasan-Imam-Bijoy",
    image: "/team/hibijoy.jpg", // Add this file to public/team/
  },
];

const DOCTOR: DoctorProfile = {
  name: "Dr. Debashish Biswas",
  designation: "Resident Physician",
  qualifications: ["MBBS (Dhaka)", "BCS (Health)", "FCPS (Medicine)", "MACP (America)"],
  regNo: "A-62099",
  hospital: "Jhenaidah Prince Hospital, Jhenaidah",
  image: "/team/doctor.webp", // Add this file to public/team/
};

const RESEARCHERS: TeamMember[] = [
  {
    name: "M. B. Mahir Tanzim",
    role: "Team Leader & Lead Author",
    affiliation: "Department of CSE, Daffodil International University",
    email: "tanzim15-5400@diu.edu.bd",
    linkedin: "https://www.linkedin.com/in/m-b-mahir-tanzim-9383912ba/?originalSubdomain=bd",
    github: "https://github.com/sumoy47",
    image: "/team/mahir.jpg", // Add this file to public/team/
  },
  {
    name: "Md. Mostafizur Rahman Zahid",
    role: "Team Member",
    affiliation: "Department of CSE, Daffodil International University",
    email: "zahid15-5209@diu.edu.bd",
    linkedin: "https://www.linkedin.com/in/mostafizur-zahid",
    researchgate: "https://www.researchgate.net/profile/Md-Mostafizur-Zahid/publications",
    image: "/team/zahid.jpg", // Add this file to public/team/
  },
];

// --- COMPONENTS ---

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <Link 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-slate-100 dark:bg-slate-800 rounded-lg"
    title={label}
  >
    <Icon size={18} />
  </Link>
);

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group">
    {/* Avatar with Image Support */}
    <div className="w-32 h-32 relative mb-4 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-100 dark:bg-slate-800">
      {member.image ? (
        <Image 
          src={member.image} 
          alt={member.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-400 dark:text-slate-500 text-3xl font-bold">
          {member.name.charAt(0)}
        </div>
      )}
    </div>
    
    {/* Info */}
    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
      {member.role}
    </span>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
    {member.designation && (
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{member.designation}</p>
    )}
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[250px]">{member.affiliation}</p>

    {/* Links */}
    <div className="flex gap-2 mt-auto">
      {member.email && <SocialLink href={`mailto:${member.email}`} icon={Mail} label="Email" />}
      {member.portfolio && <SocialLink href={member.portfolio} icon={Globe} label="Portfolio" />}
      {member.scholar && <SocialLink href={member.scholar} icon={GraduationCap} label="Google Scholar" />}
      {member.researchgate && <SocialLink href={member.researchgate} icon={BookOpen} label="ResearchGate" />}
      {member.github && <SocialLink href={member.github} icon={Github} label="GitHub" />}
      {member.linkedin && <SocialLink href={member.linkedin} icon={Linkedin} label="LinkedIn" />}
    </div>
  </div>
);

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* SECTION 1: SUPERVISION */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Supervision & Mentorship</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Guided by distinguished academic faculty members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPERVISORS.map((s, i) => <MemberCard key={i} member={s} />)}
          </div>
        </div>

        {/* SECTION 2: MEDICAL VALIDATION */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
              <Stethoscope className="text-green-600" /> Medical Validation
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Clinical accuracy verified by certified medical professionals</p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-green-200 dark:border-green-900/50 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            
            {/* Avatar with Image Support */}
            <div className="w-32 h-32 relative rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-green-50 dark:bg-green-900/20 shrink-0">
               {DOCTOR.image ? (
                <Image 
                  src={DOCTOR.image} 
                  alt={DOCTOR.name} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-green-600 dark:text-green-400 text-3xl font-bold">
                  Dr
                </div>
              )}
            </div>

            <div className="text-center md:text-left space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{DOCTOR.name}</h3>
                <p className="text-green-700 dark:text-green-400 font-semibold">{DOCTOR.designation}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {DOCTOR.qualifications.map((q, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-700">
                    {q}
                  </span>
                ))}
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Building2 size={16} />
                  <span>{DOCTOR.hospital}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Award size={16} />
                  <span>BMDC Reg: {DOCTOR.regNo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: RESEARCH TEAM */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The Researchers</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Designed, developed, and deployed the MedGuard architecture</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {RESEARCHERS.map((r, i) => <MemberCard key={i} member={r} />)}
          </div>
        </div>

      </div>
    </div>
  );
}