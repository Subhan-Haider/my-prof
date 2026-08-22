"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Database,
  Shield,
  Search,
  CheckCircle2,
  ExternalLink,
  Settings,
  FolderTree,
  ArrowLeft,
  Smartphone,
  Globe,
  Sparkles,
  Code,
  GraduationCap,
  Mail,
  Download,
  Upload,
  RotateCcw,
  X,
  Eye,
  EyeOff,
  Star,
  Tag,
  Activity,
  Check,
  AlertCircle,
  Inbox,
  Share2,
  FileText,
  Link as LinkIcon,
  Maximize2,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Save,
  RefreshCw,
  Lock,
  Unlock,
  LogOut,
  Key,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Send,
  MailCheck,
  ArrowRight,
  FolderGit2,
  GitBranch,
  GitFork,
  CheckSquare,
  Square,
} from "lucide-react";
import { Nav, GlowBadge } from "@/components/site";
import {
  projects as initialProjects,
  techCategories as initialTechCategories,
  journey as initialJourney,
  extensions as initialExtensions,
  heroScreenshots as initialHeroScreenshots,
  githubRepos as initialGithubRepos,
  HeroScreenshot,
  Project,
  TechCategory,
  Extension,
  GitHubActivityRepo,
} from "@/lib/data";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  topic: string;
  message: string;
  date: string;
  read: boolean;
}

const defaultMessages: MessageItem[] = [
  {
    id: "msg-1",
    name: "Tariq Malik",
    email: "tariq@example.com",
    subject: "Android App Collaboration",
    topic: "Android App Idea",
    message:
      "Hi Subhan, I checked out your Daily Finance project on GitHub and was impressed by your Jetpack Compose architecture and Room SQLite implementation. We have an upcoming mobile project and would love to collaborate!",
    date: "2026-08-20 14:32",
    read: false,
  },
  {
    id: "msg-2",
    name: "Sarah Jenkins",
    email: "sarah.j@techlab.io",
    subject: "Beta Tester Feedback",
    topic: "Mentorship / Feedback",
    message:
      "Downloaded the latest release from tester.subhan.tech. The offline caching is instantaneous. Great job on the 60fps chart rendering animations!",
    date: "2026-08-19 09:15",
    read: true,
  },
];

const defaultSettings = {
  name: "Subhan Haider",
  tagline: "Student. Developer. Builder.",
  bio: "Passionate high school student and developer building native Android apps, modern web platforms, and open-source tools with a focus on performance and privacy.",
  status: "Open for Collaborations & Opportunities",
  isAvailable: true,
  email: "contact@subhan.tech",
  github: "https://github.com/Subhan-Haider",
  testerUrl: "https://tester.subhan.tech/",
  resumeUrl: "/resume-subhan-haider.pdf",
  resumeFileName: "resume-subhan-haider.pdf",
};

type AdminTab =
  | "Projects"
  | "Hero"
  | "GitHub"
  | "Extensions"
  | "Skills"
  | "Journey"
  | "Messages"
  | "Settings"
  | "Database";

export default function AdminPage() {
  // Auth State
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
  const [adminUser, setAdminUser] = useState<{ email: string; role?: string } | null>(null);
  const [loginMode, setLoginMode] = useState<"otp" | "password">("otp");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Email OTP Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpResendCountdown, setOtpResendCountdown] = useState(0);

  // Timer for resend OTP
  useEffect(() => {
    if (otpResendCountdown > 0) {
      const timer = setTimeout(() => setOtpResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResendCountdown]);

  // Security password change in settings
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>("Projects");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ msg: string; type?: "success" | "error" } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Editable State
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [categories, setCategories] = useState<TechCategory[]>(initialTechCategories);
  const [journeyList, setJourneyList] = useState(initialJourney);
  const [messages, setMessages] = useState<MessageItem[]>(defaultMessages);
  const [settings, setSettings] = useState(defaultSettings);
  const [extensionList, setExtensionList] = useState<Extension[]>(initialExtensions);
  const [heroList, setHeroList] = useState<HeroScreenshot[]>(initialHeroScreenshots);
  const [githubList, setGithubList] = useState<GitHubActivityRepo[]>(initialGithubRepos);
  const [isCreatingGithubRepo, setIsCreatingGithubRepo] = useState(false);
  const [editingGithubRepo, setEditingGithubRepo] = useState<GitHubActivityRepo | null>(null);
  const [githubForm, setGithubForm] = useState<GitHubActivityRepo>({
    name: "",
    description: "",
    url: "",
    language: "TypeScript",
    stars: 0,
  });
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);

  // GitHub Explorer & Repo Picker State
  const [isBrowsingGithubRepos, setIsBrowsingGithubRepos] = useState(false);
  const [githubBrowserLoading, setGithubBrowserLoading] = useState(false);
  const [availableGithubRepos, setAvailableGithubRepos] = useState<any[]>([]);
  const [githubSearchFilter, setGithubSearchFilter] = useState("");
  const [githubLanguageFilter, setGithubLanguageFilter] = useState("all");
  const [selectedRepoNames, setSelectedRepoNames] = useState<string[]>([]);

  const [activeHeroPreview, setActiveHeroPreview] = useState(0);
  const [uploadingHeroId, setUploadingHeroId] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingProjectLogo, setUploadingProjectLogo] = useState(false);
  const [extraData, setExtraData] = useState<any>({});

  // Fetch data function
  const fetchData = async () => {
    try {
      const res = await fetch("/api/data");
      if (res.ok) {
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects)) setProjectList(data.projects);
        if (data.techCategories && Array.isArray(data.techCategories)) setCategories(data.techCategories);
        if (data.journey && Array.isArray(data.journey)) setJourneyList(data.journey);
        if (data.extensions && Array.isArray(data.extensions)) setExtensionList(data.extensions);
        if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
        if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
        if (data.heroScreenshots && Array.isArray(data.heroScreenshots) && data.heroScreenshots.length > 0) {
          setHeroList(data.heroScreenshots);
        }
        if (data.githubRepos && Array.isArray(data.githubRepos) && data.githubRepos.length > 0) {
          setGithubList(data.githubRepos);
        }
        setExtraData({ stats: data.stats, technologies: data.technologies });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthStatus("authenticated");
            setAdminUser(data.user || { email: "setupg98@gmail.com", role: "Superadmin" });
            fetchData();
            return;
          }
        }
      } catch (error) {
        console.error("Auth verification error:", error);
      }
      setAuthStatus("unauthenticated");
    };

    checkAuth();
  }, []);

  // Send OTP Email Handler
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);

    const normalizedEmail = loginEmail.trim().toLowerCase();
    if (normalizedEmail !== "setupg98@gmail.com") {
      setLoginError("Access Denied: Only setupg98@gmail.com is authorized to receive verification codes.");
      return;
    }

    try {
      setOtpSending(true);
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          email: normalizedEmail,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpResendCountdown(60);
        showToast("6-digit verification code sent to setupg98@gmail.com!");
      } else {
        setLoginError(data.error || "Failed to send verification code. Please check SMTP configuration.");
      }
    } catch {
      setLoginError("Network error while requesting verification code.");
    } finally {
      setOtpSending(false);
    }
  };

  // Verify OTP & Login Handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const normalizedEmail = loginEmail.trim().toLowerCase();
    const cleanCode = otpCode.trim();

    if (!cleanCode || cleanCode.length < 6) {
      setLoginError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      setLoginLoading(true);
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          email: normalizedEmail,
          otp: cleanCode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          try {
            localStorage.setItem("admin_auth_token", data.token);
          } catch {}
        }
        setAuthStatus("authenticated");
        setAdminUser(data.user || { email: "setupg98@gmail.com", role: "Superadmin" });
        showToast("Verification successful! Welcome to Admin Studio.");
        fetchData();
      } else {
        setLoginError(data.error || "Invalid or expired verification code.");
      }
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Password Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const normalizedEmail = loginEmail.trim().toLowerCase();
    if (normalizedEmail !== "setupg98@gmail.com") {
      setLoginError("Access Denied: Only setupg98@gmail.com is authorized to log in.");
      return;
    }

    if (!loginPassword) {
      setLoginError("Please enter your admin password.");
      return;
    }

    try {
      setLoginLoading(true);
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: normalizedEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          try {
            localStorage.setItem("admin_auth_token", data.token);
          } catch {
            // ignore
          }
        }
        setAuthStatus("authenticated");
        setAdminUser(data.user || { email: "setupg98@gmail.com", role: "Superadmin" });
        showToast("Welcome back, Superadmin!");
        fetchData();
      } else {
        setLoginError(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err) {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      try {
        localStorage.removeItem("admin_auth_token");
      } catch {
        // ignore
      }
      setAuthStatus("unauthenticated");
      setAdminUser(null);
      setLoginPassword("");
      showToast("Signed out of Admin Studio");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Change password handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMsg(null);

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeMsg({ text: "New passwords do not match.", type: "error" });
      return;
    }

    if (newPasswordInput.length < 6) {
      setPasswordChangeMsg({ text: "New password must be at least 6 characters.", type: "error" });
      return;
    }

    try {
      setChangingPassword(true);
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordChangeMsg({ text: "Admin password updated successfully!", type: "success" });
        setCurrentPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        showToast("Password updated!");
      } else {
        setPasswordChangeMsg({ text: data.error || "Failed to update password.", type: "error" });
      }
    } catch {
      setPasswordChangeMsg({ text: "An error occurred while updating password.", type: "error" });
    } finally {
      setChangingPassword(false);
    }
  };


  // Toast helper
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Central Server Persistence
  const persistData = async (overrides: Partial<any> = {}) => {
    const payload = {
      projects: overrides.projects ?? projectList,
      techCategories: overrides.techCategories ?? categories,
      journey: overrides.journey ?? journeyList,
      extensions: overrides.extensions ?? extensionList,
      settings: overrides.settings ?? settings,
      messages: overrides.messages ?? messages,
      heroScreenshots: overrides.heroScreenshots ?? heroList,
      githubRepos: overrides.githubRepos ?? githubList,
      ...extraData,
      ...overrides,
    };
    try {
      setIsSaving(true);
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Upload file helper (Images & PDFs)
  const uploadFile = async (file: File, type?: string): Promise<{ url: string; fileName: string } | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (type) formData.append("type", type);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        return { url: data.url, fileName: data.fileName || file.name };
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Resume state
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const handleResumeFile = async (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      showToast("Please upload a PDF file only", "error");
      return;
    }
    setUploadingResume(true);
    const uploaded = await uploadFile(file, "resume");
    setUploadingResume(false);

    if (uploaded) {
      const updatedSettings = {
        ...settings,
        resumeUrl: uploaded.url,
        resumeFileName: file.name,
      };
      setSettings(updatedSettings);
      await persistData({ settings: updatedSettings });
      showToast(`Uploaded & saved "${file.name}" as live resume!`);
    } else {
      showToast("Failed to upload PDF resume", "error");
    }
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setResumeDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleResumeFile(file);
  };

  const handleResumeClear = async () => {
    const updatedSettings = { ...settings, resumeUrl: "", resumeFileName: "" };
    setSettings(updatedSettings);
    await persistData({ settings: updatedSettings });
    showToast("Resume cleared and updated");
  };

  const handleResumeDownload = () => {
    if (!settings.resumeUrl) return;
    const a = document.createElement("a");
    a.href = settings.resumeUrl;
    a.download = settings.resumeFileName || "resume-subhan-haider.pdf";
    a.click();
  };

  // Modals state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [viewingMessage, setViewingMessage] = useState<MessageItem | null>(null);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);
  const [newSkillCategory, setNewSkillCategory] = useState("Mobile & Android");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Proficient");

  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [editingSkill, setEditingSkill] = useState<{ catName: string; skillName: string; level: string } | null>(null);
  const [editSkillForm, setEditSkillForm] = useState({ name: "", level: "" });

  const [isCreatingJourney, setIsCreatingJourney] = useState(false);
  const [editingJourney, setEditingJourney] = useState<any>(null);
  const [journeyForm, setJourneyForm] = useState<any>({
    year: "",
    title: "",
    description: "",
    badge: "",
  });

  // Extension state
  const [editingExtension, setEditingExtension] = useState<Extension | null>(null);
  const [isCreatingExtension, setIsCreatingExtension] = useState(false);
  const [extForm, setExtForm] = useState<Extension>({
    name: "",
    url: "",
    role: "",
    desc: "",
    color: "#34d399",
    platforms: [],
  });
  const [extPlatformInput, setExtPlatformInput] = useState({ label: "", href: "", color: "#E34F26" });

  // Project Form State
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    slug: "",
    title: "",
    tagline: "",
    type: "Android",
    summary: "",
    stack: [],
    featured: true,
    year: "2025",
    features: [],
    idea: "",
    challenge: "",
    solution: "",
    liveUrl: "",
    githubUrl: "",
    logoUrl: "",
  });
  const [stackInput, setStackInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  // Hero Showcase Handlers
  const handleUpdateHero = async (id: string, updates: Partial<HeroScreenshot>) => {
    const updated = heroList.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setHeroList(updated);
    await persistData({ heroScreenshots: updated });
    showToast("Updated and saved screenshot slide");
  };

  const handleHeroFileUpload = async (id: string, file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file (PNG, JPG, WEBP)", "error");
      return;
    }
    setUploadingHeroId(id);
    const uploaded = await uploadFile(file);
    setUploadingHeroId(null);
    if (uploaded) {
      await handleUpdateHero(id, { image: uploaded.url });
      showToast("Screenshot image uploaded and saved!");
    } else {
      showToast("Failed to upload image", "error");
    }
  };

  const handleAddHeroItem = async () => {
    const newId = "slide-" + Date.now().toString().slice(-4);
    const newItem: HeroScreenshot = {
      id: newId,
      title: "New Feature Screen",
      file: "MainScreen.kt",
      tag: "Native Compose",
      image: "/images/daily-finance-dashboard.jpg",
      badge: "Android App",
      desc: "Interactive Android UI component featuring modern architecture and responsive layout.",
    };
    const updated = [...heroList, newItem];
    setHeroList(updated);
    setActiveHeroPreview(heroList.length);
    await persistData({ heroScreenshots: updated });
    showToast("Added new hero screenshot slide");
  };

  const handleDeleteHeroItem = async (id: string) => {
    if (heroList.length <= 1) {
      showToast("At least one hero screenshot slide is required", "error");
      return;
    }
    if (confirm("Are you sure you want to delete this hero screenshot slide?")) {
      const updated = heroList.filter((item) => item.id !== id);
      setHeroList(updated);
      setActiveHeroPreview(0);
      await persistData({ heroScreenshots: updated });
      showToast("Deleted screenshot slide");
    }
  };

  const handleMoveHeroItem = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroList.length) return;
    const updated = [...heroList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setHeroList(updated);
    setActiveHeroPreview(targetIndex);
    await persistData({ heroScreenshots: updated });
    showToast("Reordered screenshot slides");
  };

  // Open Create Project
  const handleOpenCreateProject = () => {
    setProjectForm({
      slug: "new-project-" + Date.now().toString().slice(-4),
      title: "",
      tagline: "",
      type: "Android",
      summary: "",
      stack: ["Kotlin", "Jetpack Compose"],
      featured: true,
      year: "2025",
      features: ["Offline SQLite database", "Material 3 theme"],
      idea: "",
      challenge: "",
      solution: "",
      liveUrl: "",
      githubUrl: "https://github.com/Subhan-Haider",
      logoUrl: "",
    });
    setStackInput("Kotlin, Jetpack Compose, Room DB");
    setFeaturesInput("Real-time logging\nOffline first\nMaterial 3 theming");
    setIsCreatingProject(true);
  };

  // Open Edit Project
  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm(proj);
    setStackInput(proj.stack.join(", "));
    setFeaturesInput((proj.features || []).join("\n"));
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStack = stackInput.split(",").map((s) => s.trim()).filter(Boolean);
    const updatedFeatures = featuresInput.split("\n").map((f) => f.trim()).filter(Boolean);

    const newProjData: Project = {
      slug: projectForm.slug?.trim() || "project-" + Date.now(),
      title: projectForm.title?.trim() || "Untitled Project",
      tagline: projectForm.tagline?.trim() || "",
      type: (projectForm.type as Project["type"]) || "Android",
      summary: projectForm.summary?.trim() || "",
      stack: updatedStack.length ? updatedStack : ["General"],
      featured: projectForm.featured ?? true,
      year: projectForm.year?.trim() || "2025",
      features: updatedFeatures,
      idea: projectForm.idea?.trim(),
      challenge: projectForm.challenge?.trim(),
      solution: projectForm.solution?.trim(),
      liveUrl: projectForm.liveUrl?.trim(),
      githubUrl: projectForm.githubUrl?.trim(),
      logoUrl: projectForm.logoUrl?.trim(),
    };

    let updatedList: Project[] = [];
    if (isCreatingProject) {
      updatedList = [newProjData, ...projectList];
      setProjectList(updatedList);
      showToast(`Created project "${newProjData.title}"`);
    } else if (editingProject) {
      updatedList = projectList.map((p) => (p.slug === editingProject.slug ? newProjData : p));
      setProjectList(updatedList);
      showToast(`Updated project "${newProjData.title}"`);
    }

    await persistData({ projects: updatedList });
    setIsCreatingProject(false);
    setEditingProject(null);
  };

  // Delete Project
  const handleDeleteProject = async (slug: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const p = projectList.find((x) => x.slug === slug);
      const updated = projectList.filter((x) => x.slug !== slug);
      setProjectList(updated);
      await persistData({ projects: updated });
      showToast(`Deleted "${p?.title || slug}"`);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (slug: string) => {
    const updated = projectList.map((p) =>
      p.slug === slug ? { ...p, featured: !p.featured } : p
    );
    setProjectList(updated);
    await persistData({ projects: updated });
    showToast("Updated featured state");
  };

  // Add Skill
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updated = categories.map((c) => {
      if (c.category === newSkillCategory) {
        return {
          ...c,
          items: [...c.items, { name: newSkillName.trim(), level: newSkillLevel }],
        };
      }
      return c;
    });

    setCategories(updated);
    await persistData({ techCategories: updated });
    setNewSkillName("");
    setIsCreatingSkill(false);
    showToast(`Added skill "${newSkillName}"`);
  };

  // Add Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const updated = [...categories, { category: newCategoryName.trim(), items: [] }];
    setCategories(updated);
    await persistData({ techCategories: updated });
    setNewCategoryName("");
    setIsCreatingCategory(false);
    showToast(`Added category "${newCategoryName}"`);
  };

  // Delete Category
  const handleDeleteCategory = async (catName: string) => {
    if (confirm(`Delete category "${catName}" and all its skills?`)) {
      const updated = categories.filter((c) => c.category !== catName);
      setCategories(updated);
      await persistData({ techCategories: updated });
      showToast(`Deleted category "${catName}"`);
    }
  };

  // Edit Category
  const handleSaveEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategoryName.trim() || !editingCategory) return;
    const updated = categories.map((c) =>
      c.category === editingCategory
        ? { ...c, category: editCategoryName.trim() }
        : c
    );
    setCategories(updated);
    await persistData({ techCategories: updated });
    setEditingCategory(null);
    showToast(`Updated category "${editCategoryName}"`);
  };

  // Edit Skill
  const handleSaveEditSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSkillForm.name.trim() || !editingSkill) return;
    const updated = categories.map((c) => {
      if (c.category === editingSkill.catName) {
        return {
          ...c,
          items: c.items.map((item) =>
            item.name === editingSkill.skillName
              ? { name: editSkillForm.name.trim(), level: editSkillForm.level }
              : item
          ),
        };
      }
      return c;
    });
    setCategories(updated);
    await persistData({ techCategories: updated });
    setEditingSkill(null);
    showToast(`Updated skill "${editSkillForm.name}"`);
  };

  // Delete Skill
  const handleDeleteSkill = async (catName: string, skillName: string) => {
    const updated = categories.map((c) => {
      if (c.category === catName) {
        return {
          ...c,
          items: c.items.filter((item) => item.name !== skillName),
        };
      }
      return c;
    });
    setCategories(updated);
    await persistData({ techCategories: updated });
    showToast(`Removed skill "${skillName}"`);
  };

  // Journey Handlers
  const handleOpenCreateJourney = () => {
    setJourneyForm({ year: "", title: "", description: "", badge: "" });
    setIsCreatingJourney(true);
  };

  const handleOpenEditJourney = (j: any) => {
    setEditingJourney(j);
    setJourneyForm(j);
  };

  const handleSaveJourney = async (e: React.FormEvent) => {
    e.preventDefault();
    let updated: any[] = [];
    if (isCreatingJourney) {
      updated = [...journeyList, journeyForm];
      setJourneyList(updated);
      showToast(`Added milestone "${journeyForm.title}"`);
    } else if (editingJourney) {
      updated = journeyList.map((j) => (j.title === editingJourney.title ? journeyForm : j));
      setJourneyList(updated);
      showToast(`Updated milestone "${journeyForm.title}"`);
    }
    await persistData({ journey: updated });
    setIsCreatingJourney(false);
    setEditingJourney(null);
  };

  const handleDeleteJourney = async (title: string) => {
    if (confirm("Are you sure you want to delete this milestone?")) {
      const updated = journeyList.filter((j) => j.title !== title);
      setJourneyList(updated);
      await persistData({ journey: updated });
      showToast("Deleted milestone");
    }
  };

  // Extension Handlers
  const handleOpenCreateExtension = () => {
    setExtForm({ name: "", url: "", role: "", desc: "", color: "#34d399", platforms: [] });
    setExtPlatformInput({ label: "", href: "", color: "#E34F26" });
    setIsCreatingExtension(true);
  };

  const handleOpenEditExtension = (ext: Extension) => {
    setExtForm({ ...ext, platforms: ext.platforms.map((p) => ({ ...p })) });
    setExtPlatformInput({ label: "", href: "", color: "#E34F26" });
    setEditingExtension(ext);
  };

  const handleSaveExtension = async (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Extension[] = [];
    if (isCreatingExtension) {
      updated = [...extensionList, extForm];
      setExtensionList(updated);
      showToast(`Added extension "${extForm.name}"`);
    } else if (editingExtension) {
      updated = extensionList.map((ex) => (ex.name === editingExtension.name ? extForm : ex));
      setExtensionList(updated);
      showToast(`Updated extension "${extForm.name}"`);
    }
    await persistData({ extensions: updated });
    setIsCreatingExtension(false);
    setEditingExtension(null);
  };

  const handleDeleteExtension = async (name: string) => {
    if (confirm(`Delete extension "${name}"?`)) {
      const updated = extensionList.filter((ex) => ex.name !== name);
      setExtensionList(updated);
      await persistData({ extensions: updated });
      showToast(`Deleted extension "${name}"`);
    }
  };

  const handleAddExtPlatform = () => {
    if (!extPlatformInput.label.trim() || !extPlatformInput.href.trim()) return;
    setExtForm({ ...extForm, platforms: [...extForm.platforms, { ...extPlatformInput }] });
    setExtPlatformInput({ label: "", href: "", color: "#E34F26" });
  };

  const handleRemoveExtPlatform = (idx: number) => {
    setExtForm({ ...extForm, platforms: extForm.platforms.filter((_, i) => i !== idx) });
  };

  // Message Handlers
  const handleToggleMessageRead = async (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
    setMessages(updated);
    await persistData({ messages: updated });
  };

  const handleDeleteMessage = async (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    if (viewingMessage?.id === id) setViewingMessage(null);
    await persistData({ messages: updated });
    showToast("Message deleted");
  };

  // Settings Save Handler
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const success = await persistData({ settings });
    if (success) {
      showToast("Profile & site settings saved successfully!");
    } else {
      showToast("Failed to save settings", "error");
    }
  };

  // GitHub Activity Handlers
  const handleOpenCreateGithubRepo = () => {
    setGithubForm({
      name: "",
      description: "Open source experiment and code shared on GitHub.",
      url: "https://github.com/Subhan-Haider/",
      language: "TypeScript",
      stars: 0,
    });
    setIsCreatingGithubRepo(true);
    setEditingGithubRepo(null);
  };

  const handleOpenEditGithubRepo = (repo: GitHubActivityRepo) => {
    setGithubForm({ ...repo });
    setEditingGithubRepo(repo);
    setIsCreatingGithubRepo(false);
  };

  const handleSaveGithubRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubForm.name.trim()) {
      showToast("Repository name is required", "error");
      return;
    }
    const cleanRepo: GitHubActivityRepo = {
      name: githubForm.name.trim(),
      description: githubForm.description.trim() || "Open source experiment and code shared on GitHub.",
      url: githubForm.url.trim() || `https://github.com/Subhan-Haider/${githubForm.name.trim()}`,
      language: githubForm.language.trim() || "TypeScript",
      stars: Number(githubForm.stars) || 0,
    };

    let updated: GitHubActivityRepo[] = [];
    if (isCreatingGithubRepo) {
      updated = [...githubList, cleanRepo];
      setGithubList(updated);
      showToast(`Added "${cleanRepo.name}" to Live GitHub Activity!`);
    } else if (editingGithubRepo) {
      updated = githubList.map((r) => (r.name === editingGithubRepo.name ? cleanRepo : r));
      setGithubList(updated);
      showToast(`Updated "${cleanRepo.name}" repository!`);
    }

    await persistData({ githubRepos: updated });
    setIsCreatingGithubRepo(false);
    setEditingGithubRepo(null);
  };

  const handleDeleteGithubRepo = async (name: string) => {
    if (confirm(`Remove "${name}" from Live GitHub Activity?`)) {
      const updated = githubList.filter((r) => r.name !== name);
      setGithubList(updated);
      await persistData({ githubRepos: updated });
      showToast(`Removed "${name}"`);
    }
  };

  const handleMoveGithubRepo = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= githubList.length) return;
    const updated = [...githubList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setGithubList(updated);
    await persistData({ githubRepos: updated });
    showToast("Reordered GitHub repositories");
  };

  const handleSyncGithubFromAPI = async () => {
    try {
      setIsSyncingGithub(true);
      const res = await fetch("/api/github?sync=live");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setGithubList(data);
          await persistData({ githubRepos: data });
          showToast(`Synced ${data.length} latest repositories from GitHub!`);
        } else {
          showToast("No repositories returned from GitHub API", "error");
        }
      } else {
        showToast("Failed to fetch repositories from GitHub", "error");
      }
    } catch {
      showToast("Network error syncing from GitHub", "error");
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const handleOpenGithubBrowser = async () => {
    setIsBrowsingGithubRepos(true);
    setGithubSearchFilter("");
    setGithubLanguageFilter("all");
    setSelectedRepoNames([]);

    if (availableGithubRepos.length === 0) {
      setGithubBrowserLoading(true);
      try {
        const res = await fetch("/api/github?action=browse");
        if (res.ok) {
          const data = await res.json();
          if (data.repos && Array.isArray(data.repos)) {
            setAvailableGithubRepos(data.repos);
          }
        }
      } catch {
        showToast("Error loading GitHub repositories", "error");
      } finally {
        setGithubBrowserLoading(false);
      }
    }
  };

  const handleRefreshAvailableRepos = async () => {
    setGithubBrowserLoading(true);
    try {
      const res = await fetch("/api/github?action=browse");
      if (res.ok) {
        const data = await res.json();
        if (data.repos && Array.isArray(data.repos)) {
          setAvailableGithubRepos(data.repos);
          showToast(`Refreshed ${data.repos.length} repositories from GitHub!`);
        }
      }
    } catch {
      showToast("Error fetching from GitHub", "error");
    } finally {
      setGithubBrowserLoading(false);
    }
  };

  const handleImportSingleRepo = async (repo: any) => {
    const cleanRepo: GitHubActivityRepo = {
      name: repo.name,
      description: repo.description || "Open source experiment and code shared on GitHub.",
      url: repo.url,
      language: repo.language || "TypeScript",
      stars: Number(repo.stars) || 0,
      updatedAt: repo.updatedAt,
    };

    let updated: GitHubActivityRepo[];
    const exists = githubList.some((r) => r.name.toLowerCase() === cleanRepo.name.toLowerCase());
    if (exists) {
      updated = githubList.map((r) =>
        r.name.toLowerCase() === cleanRepo.name.toLowerCase() ? cleanRepo : r
      );
      showToast(`Updated "${cleanRepo.name}" in Live GitHub Activity!`);
    } else {
      updated = [...githubList, cleanRepo];
      showToast(`Added "${cleanRepo.name}" to Live GitHub Activity!`);
    }

    setGithubList(updated);
    await persistData({ githubRepos: updated });
  };

  const handleImportSelectedRepos = async () => {
    if (selectedRepoNames.length === 0) {
      showToast("Please select at least one repository to import", "error");
      return;
    }

    const reposToImport = availableGithubRepos.filter((r) => selectedRepoNames.includes(r.name));
    let updated = [...githubList];

    for (const r of reposToImport) {
      const cleanRepo: GitHubActivityRepo = {
        name: r.name,
        description: r.description || "Open source experiment and code shared on GitHub.",
        url: r.url,
        language: r.language || "TypeScript",
        stars: Number(r.stars) || 0,
        updatedAt: r.updatedAt,
      };

      const existingIndex = updated.findIndex((x) => x.name.toLowerCase() === cleanRepo.name.toLowerCase());
      if (existingIndex >= 0) {
        updated[existingIndex] = cleanRepo;
      } else {
        updated.push(cleanRepo);
      }
    }

    setGithubList(updated);
    await persistData({ githubRepos: updated });
    setIsBrowsingGithubRepos(false);
    setSelectedRepoNames([]);
    showToast(`Imported ${reposToImport.length} repositories into Live GitHub Activity!`);
  };

  const handleSelectRepoForForm = (repo: any) => {
    setGithubForm({
      name: repo.name,
      description: repo.description || "Open source experiment and code shared on GitHub.",
      url: repo.url,
      language: repo.language || "TypeScript",
      stars: Number(repo.stars) || 0,
    });
    showToast(`Auto-filled details from "${repo.name}"`);
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      settings,
      projects: projectList,
      techCategories: categories,
      journey: journeyList,
      extensions: extensionList,
      heroScreenshots: heroList,
      githubRepos: githubList,
      messages,
      ...extraData,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subhan-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported complete portfolio backup JSON");
  };

  // Reset to default
  const handleResetToDefaults = async () => {
    if (confirm("Reset all collections to initial factory defaults and overwrite database?")) {
      setProjectList(initialProjects);
      setCategories(initialTechCategories);
      setJourneyList(initialJourney);
      setMessages(defaultMessages);
      setSettings(defaultSettings);
      setExtensionList(initialExtensions);
      setHeroList(initialHeroScreenshots);
      setGithubList(initialGithubRepos);
      await persistData({
        projects: initialProjects,
        techCategories: initialTechCategories,
        journey: initialJourney,
        messages: defaultMessages,
        settings: defaultSettings,
        extensions: initialExtensions,
        heroScreenshots: initialHeroScreenshots,
        githubRepos: initialGithubRepos,
      });
      showToast("Reset all collections to initial defaults");
    }
  };

  const filteredProjects = projectList.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const unreadMessagesCount = messages.filter((m) => !m.read).length;
  const totalSkillsCount = categories.reduce((acc, c) => acc + c.items.length, 0);

  // Checking auth state loader
  if (authStatus === "checking") {
    return (
      <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center justify-center overflow-hidden">
        <Nav />
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[250px] bg-[#6366f1]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] shadow-xl">
            <Shield className="text-[#34d399] animate-pulse" size={32} />
            <div className="absolute inset-0 rounded-2xl border border-[#34d399]/30 animate-ping opacity-25" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              Verifying Studio Access...
            </h2>
            <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
              Checking secure session credentials
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Unauthenticated Login Portal
  if (authStatus === "unauthenticated") {
    const isAuthorizedEmail = loginEmail.trim().toLowerCase() === "setupg98@gmail.com";

    return (
      <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden flex flex-col justify-center items-center px-4 py-20">
        <Nav />

        {/* Ambient Backdrops */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#34d399]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[#6366f1]/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-xs font-mono shadow-2xl backdrop-blur-2xl animate-in fade-in ${
              toast.type === "error"
                ? "border-red-500/40 bg-red-950/90 text-white"
                : "border-[#34d399]/40 bg-[var(--bg-surface)] text-[var(--text-primary)]"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} className="text-red-400" /> : <CheckCircle2 size={16} className="text-[#34d399]" />}
            <span>{toast.msg}</span>
          </div>
        )}

        <div className="relative z-10 w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl relative overflow-hidden">
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34d399] to-transparent opacity-80" />

            {/* Header / Badge */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <GlowBadge variant="emerald">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase">
                    <Lock size={11} /> Restricted Access
                  </span>
                </GlowBadge>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                PORTFOLIO STUDIO<span className="text-[#34d399]">.</span>
              </h1>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Single administrator authentication portal.
              </p>
            </div>

            {/* Mode Switcher: Email OTP vs Password */}
            <div className="mt-6 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => {
                  setLoginMode("otp");
                  setLoginError(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  loginMode === "otp"
                    ? "bg-[#34d399] text-[#090a12] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Mail size={13} />
                <span>Email Code</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode("password");
                  setLoginError(null);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  loginMode === "password"
                    ? "bg-[#34d399] text-[#090a12] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Key size={13} />
                <span>Password</span>
              </button>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="mt-4 p-3 rounded-2xl border border-red-500/40 bg-red-950/40 text-red-300 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
                <div className="leading-snug">{loginError}</div>
              </div>
            )}

            {/* MODE 1: EMAIL OTP VERIFICATION */}
            {loginMode === "otp" && (
              <div className="mt-5 space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Administrator Email
                      </label>
                      <input
                        required
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter administrator email"
                        className="w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] font-mono transition-colors focus:border-[#34d399] focus:outline-none"
                      />
                      <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                        A secure 6-digit verification code will be sent via SMTP to your email inbox.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={otpSending}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#34d399] py-3.5 text-xs font-bold text-[#090a12] shadow-lg shadow-[#34d399]/20 hover:bg-[#6ee7b7] hover:shadow-[#34d399]/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {otpSending ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Dispatching Verification Email...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send 6-Digit Code</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
                    <div className="p-3 rounded-2xl border border-[#34d399]/30 bg-[#34d399]/10 text-xs font-mono text-[#34d399] flex items-center gap-2">
                      <MailCheck size={16} className="shrink-0" />
                      <div className="min-w-0">
                        <span className="font-semibold block">Code Dispatched!</span>
                        <span className="text-[11px] text-[var(--text-secondary)] truncate block">
                          Check {loginEmail} for the 6-digit passcode.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                        Enter 6-Digit Verification Code
                      </label>
                      <input
                        required
                        autoFocus
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="••••••"
                        className="w-full rounded-2xl border border-[#34d399]/40 bg-[var(--bg-surface-elevated)] px-4 py-3.5 text-center text-xl font-bold font-mono tracking-[0.5em] text-[#34d399] transition-colors focus:border-[#34d399] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading || otpCode.length !== 6}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#34d399] py-3.5 text-xs font-bold text-[#090a12] shadow-lg shadow-[#34d399]/20 hover:bg-[#6ee7b7] hover:shadow-[#34d399]/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loginLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Verifying Code...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={15} />
                          <span>Verify &amp; Enter Studio</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode("");
                        }}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        ← Change Email
                      </button>

                      {otpResendCountdown > 0 ? (
                        <span className="text-[11px] text-[var(--text-muted)]">
                          Resend code in {otpResendCountdown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          disabled={otpSending}
                          className="text-[#34d399] hover:underline cursor-pointer"
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MODE 2: ADMIN PASSWORD */}
            {loginMode === "password" && (
              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Administrator Email
                  </label>
                  <input
                    required
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter administrator email"
                    className="w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] font-mono transition-colors focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] transition-colors focus:border-[#34d399] focus:outline-none pr-11 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#34d399] py-3.5 text-xs font-bold text-[#090a12] shadow-lg shadow-[#34d399]/20 hover:bg-[#6ee7b7] hover:shadow-[#34d399]/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loginLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Sign In with Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Back link & help */}
            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Return to Portfolio</span>
              </Link>

              <span className="font-mono text-[10px] text-[#34d399]">v2.5 · Verified Admin</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Nav />

      {/* Floating Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-xs font-mono shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 ${
            toast.type === "error"
              ? "border-red-500/40 bg-red-950/90 text-white"
              : "border-[#34d399]/40 bg-[var(--bg-surface)] text-[var(--text-primary)]"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle size={16} className="text-red-400" />
          ) : (
            <CheckCircle2 size={16} className="text-[#34d399]" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}

      <section className="relative pt-32 sm:pt-36 pb-20 px-4 sm:px-6 md:px-12 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-28 left-1/4 w-[600px] h-[350px] bg-[#6366f1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <GlowBadge variant="emerald">
                  <span>CMS ADMIN STUDIO</span>
                </GlowBadge>
                <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Activity size={12} className="animate-pulse" />
                  <span>Auto-Sync Active</span>
                </span>
                {lastSaved && (
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    Saved at {lastSaved}
                  </span>
                )}
              </div>

              <h1 className="display-title mt-4 text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
                PORTFOLIO STUDIO<span className="text-[#34d399]">.</span>
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Real-time management for projects, hero screenshots, skills matrix, milestones, and site configuration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Authorized Superadmin Pill */}
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#34d399]/25 bg-[#34d399]/5 text-xs font-mono text-[var(--text-secondary)]">
                <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                <span className="text-[var(--text-primary)] font-semibold">{adminUser?.email || "setupg98@gmail.com"}</span>
                <span className="text-[10px] bg-[#34d399]/20 text-[#34d399] px-2 py-0.5 rounded-full font-bold">Admin</span>
              </div>

              <button
                onClick={() => persistData()}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 text-xs font-mono text-[#34d399] hover:bg-[#34d399]/20 transition-colors cursor-pointer"
                title="Save all collections to server"
              >
                {isSaving ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Database size={13} />
                )}
                <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                title="Download JSON Backup"
              >
                <Download size={13} />
                <span>Export Backup</span>
              </button>

              <Link
                href="/"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all"
              >
                <ArrowLeft size={13} />
                <span>View Site</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                title="Sign out of Admin Studio"
              >
                <LogOut size={13} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 backdrop-blur-xl shadow-sm">
              <span className="text-xs font-mono text-[var(--text-muted)] block">PROJECTS</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-[var(--text-primary)]">
                  {projectList.length}
                </span>
                <span className="text-[11px] font-mono text-[#34d399]">
                  {projectList.filter((p) => p.featured).length} Featured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 backdrop-blur-xl shadow-sm">
              <span className="text-xs font-mono text-[var(--text-muted)] block">SKILLS MATRIX</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-[var(--text-primary)]">
                  {totalSkillsCount}
                </span>
                <span className="text-[11px] font-mono text-[#38bdf8]">
                  {categories.length} Categories
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 backdrop-blur-xl shadow-sm">
              <span className="text-xs font-mono text-[var(--text-muted)] block">JOURNEY PHASES</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-[var(--text-primary)]">
                  {journeyList.length}
                </span>
                <span className="text-[11px] font-mono text-[#a855f7]">Milestones</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 backdrop-blur-xl shadow-sm">
              <span className="text-xs font-mono text-[var(--text-muted)] block">INBOX INQUIRIES</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-[var(--text-primary)]">
                  {messages.length}
                </span>
                {unreadMessagesCount > 0 ? (
                  <span className="text-[11px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                    {unreadMessagesCount} Unread
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">All Read</span>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid: Sidebar & Workspace */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
            {/* Sidebar Navigation */}
            <aside className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:p-4 backdrop-blur-xl shadow-sm">
              <div className="hidden lg:block px-3 py-2 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Studio Collections
              </div>

              <div className="flex flex-row overflow-x-auto gap-2 lg:flex-col lg:gap-1 lg:overflow-visible pb-1 lg:pb-0 scrollbar-none">
                {(
                  [
                    { id: "Projects", label: "Projects & Apps", icon: Smartphone, count: projectList.length },
                    { id: "Hero", label: "Hero Showcase", icon: ImageIcon, count: heroList.length },
                    { id: "GitHub", label: "GitHub Activity", icon: FolderGit2, count: githubList.length },
                    { id: "Extensions", label: "Extensions & Tools", icon: Globe, count: extensionList.length },
                    { id: "Skills", label: "Skills Matrix", icon: Code, count: totalSkillsCount },
                    { id: "Journey", label: "Journey Milestones", icon: GraduationCap, count: journeyList.length },
                    { id: "Messages", label: "Inbox Messages", icon: Inbox, count: messages.length, badge: unreadMessagesCount },
                    { id: "Settings", label: "Site & Profile", icon: Settings, count: 1 },
                    { id: "Database", label: "Sync & Database", icon: Database, count: "Active" as string | number },
                  ] as Array<{
                    id: AdminTab;
                    label: string;
                    icon: React.ComponentType<{ size?: number; className?: string }>;
                    count: string | number;
                    badge?: number;
                  }>
                ).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as AdminTab);
                        setSearch("");
                      }}
                      className={`whitespace-nowrap flex-shrink-0 lg:w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:py-3 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 font-bold shadow-sm"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className={isActive ? "text-[#34d399]" : "text-[var(--text-muted)]"} />
                        <span>{tab.label}</span>
                      </div>

                      {tab.badge ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">
                          {tab.badge}
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isActive ? "bg-[#34d399]/20 text-[#34d399]" : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="hidden lg:block pt-4 mt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={handleResetToDefaults}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </aside>

            {/* Workspace Area */}
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 backdrop-blur-xl shadow-sm min-h-[560px]">
              {/* TAB 1: PROJECTS */}
              {activeTab === "Projects" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Project Records</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Manage case studies, architecture notes, and mobile APK builds
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleOpenCreateProject}
                        className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2.5 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                      >
                        <Plus size={15} />
                        <span>Add Project</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="mt-6 relative">
                    <Search size={15} className="absolute left-4 top-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      placeholder="Filter projects by title, stack, or category..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] pl-11 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#34d399] focus:outline-none"
                    />
                  </div>

                  {/* Projects List */}
                  <div className="mt-6 space-y-3">
                    {filteredProjects.length === 0 ? (
                      <div className="py-12 text-center text-xs text-[var(--text-muted)]">
                        No projects matching &ldquo;{search}&rdquo;
                      </div>
                    ) : (
                      filteredProjects.map((proj) => (
                        <div
                          key={proj.slug}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 hover:border-[var(--border-active)] transition-all"
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                                {proj.title}
                              </h3>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                                  proj.featured
                                    ? "bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 font-bold"
                                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                                }`}
                                onClick={() => handleToggleFeatured(proj.slug)}
                                title="Click to toggle featured status"
                              >
                                {proj.featured ? "★ Featured" : "Standard"}
                              </span>
                              <span className="text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
                                {proj.type}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                {proj.year}
                              </span>
                            </div>

                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1 max-w-xl">
                              {proj.summary}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {proj.stack.map((s) => (
                                <span
                                  key={s}
                                  className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2 py-0.5 rounded"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              href={`/projects/${proj.slug}`}
                              className="p-2 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
                              title="Preview on live site"
                            >
                              <Eye size={13} />
                            </Link>

                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.slug)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB: HERO SHOWCASE */}
              {activeTab === "Hero" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Hero Showcase Screenshots</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Live phone mockup carousel on homepage — upload screenshots, change code labels, and reorder slides.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleAddHeroItem}
                        className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2.5 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                      >
                        <Plus size={15} />
                        <span>Add New Slide</span>
                      </button>
                    </div>
                  </div>

                  {/* Showcase Grid: Live Preview + Slide Cards */}
                  <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] items-start">
                    {/* Live Phone Mockup Preview */}
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 backdrop-blur-xl sticky top-28">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)] text-xs font-mono">
                        <span className="text-[#34d399] font-bold">HOMEPAGE PREVIEW</span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {heroList.length > 0 ? `Slide ${activeHeroPreview + 1} of ${heroList.length}` : "Empty"}
                        </span>
                      </div>

                      {heroList.length > 0 && (
                        <div>
                          {/* Window bar */}
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-subtle)] text-[11px] font-mono">
                            <span className="text-[var(--text-primary)] truncate max-w-[130px]">
                              {heroList[activeHeroPreview]?.file || "MainScreen.kt"}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#34d399]/10 text-[#34d399] text-[10px]">
                              {heroList[activeHeroPreview]?.tag || "Native Compose"}
                            </span>
                          </div>

                          {/* Smartphone Simulator */}
                          <div className="relative mx-auto w-full max-w-[230px] aspect-[9/18.5] rounded-[1.8rem] border-[6px] border-[#1e2238] bg-[#07080e] shadow-2xl overflow-hidden flex flex-col justify-between group">
                            {/* Speaker Notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-3.5 w-16 rounded-full bg-[#1e2238] z-30 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#0d0f1a] mr-1.5" />
                              <div className="w-4 h-0.5 rounded-full bg-[#0d0f1a]" />
                            </div>

                            {/* Prev / Next controls */}
                            <button
                              onClick={() =>
                                setActiveHeroPreview((prev) =>
                                  prev === 0 ? heroList.length - 1 : prev - 1
                                )
                              }
                              aria-label="Previous Preview"
                              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center z-20 hover:scale-110 cursor-pointer"
                            >
                              <ChevronLeft size={13} />
                            </button>
                            <button
                              onClick={() =>
                                setActiveHeroPreview((prev) =>
                                  prev === heroList.length - 1 ? 0 : prev + 1
                                )
                              }
                              aria-label="Next Preview"
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center z-20 hover:scale-110 cursor-pointer"
                            >
                              <ChevronRight size={13} />
                            </button>

                            {/* Image */}
                            <div className="relative w-full h-full overflow-hidden">
                              <img
                                src={heroList[activeHeroPreview]?.image || "/images/daily-finance-dashboard.jpg"}
                                alt={heroList[activeHeroPreview]?.title}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>

                            {/* Info Bar */}
                            <div className="absolute bottom-2 inset-x-2 rounded-lg bg-[#090a12]/90 border border-white/10 p-2 backdrop-blur-md z-20 text-left">
                              <span className="text-[9px] font-mono text-[#34d399] uppercase tracking-wider block">
                                {heroList[activeHeroPreview]?.badge}
                              </span>
                              <h6 className="text-[11px] font-bold text-white leading-tight truncate">
                                {heroList[activeHeroPreview]?.title}
                              </h6>
                            </div>
                          </div>

                          <p className="mt-3 text-center text-[11px] text-[var(--text-secondary)] font-mono line-clamp-2">
                            {heroList[activeHeroPreview]?.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Slide Cards List */}
                    <div className="space-y-6">
                      {heroList.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className={`rounded-2xl border p-6 transition-all ${
                            activeHeroPreview === idx
                              ? "border-[#34d399]/40 bg-[#34d399]/[0.03] shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-active)]"
                          }`}
                        >
                          {/* Slide Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[#34d399] font-bold">
                                SLIDE 0{idx + 1}
                              </span>
                              <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                                {item.title || "Untitled Slide"}
                              </h3>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setActiveHeroPreview(idx)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                                  activeHeroPreview === idx
                                    ? "bg-[#34d399] text-[#090a12] font-bold"
                                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }`}
                                title="Preview this slide"
                              >
                                <Eye size={13} />
                                <span>Preview</span>
                              </button>

                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveHeroItem(idx, "up")}
                                className="p-1.5 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                                title="Move up"
                              >
                                <ArrowUp size={14} />
                              </button>

                              <button
                                type="button"
                                disabled={idx === heroList.length - 1}
                                onClick={() => handleMoveHeroItem(idx, "down")}
                                className="p-1.5 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                                title="Move down"
                              >
                                <ArrowDown size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteHeroItem(item.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                                title="Delete slide"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Image Preview & Upload Controls */}
                          <div className="mt-5 grid gap-5 sm:grid-cols-[130px_1fr] items-start">
                            {/* Thumbnail */}
                            <div className="relative aspect-[9/16] w-full rounded-xl border border-[var(--border-medium)] bg-black/60 overflow-hidden group/img">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top"
                              />
                              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer transition-opacity backdrop-blur-xs">
                                <UploadCloud size={20} className="text-[#34d399]" />
                                <span className="text-[10px] font-mono font-bold">Replace Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleHeroFileUpload(item.id, e.target.files?.[0] ?? null)}
                                />
                              </label>
                            </div>

                            {/* Upload & Quick Preset Picker */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                  Screenshot Image Source / File
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                  <input
                                    type="text"
                                    value={item.image}
                                    onChange={(e) => handleUpdateHero(item.id, { image: e.target.value })}
                                    placeholder="/images/daily-finance-dashboard.jpg or https://..."
                                    className="flex-1 min-w-[200px] rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                                  />

                                  <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 text-xs font-mono hover:bg-[#34d399]/25 cursor-pointer transition-colors">
                                    {uploadingHeroId === item.id ? (
                                      <Activity size={13} className="animate-spin" />
                                    ) : (
                                      <Upload size={13} />
                                    )}
                                    <span>{uploadingHeroId === item.id ? "Uploading..." : "Upload Image"}</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      disabled={uploadingHeroId === item.id}
                                      onChange={(e) => handleHeroFileUpload(item.id, e.target.files?.[0] ?? null)}
                                    />
                                  </label>
                                </div>
                              </div>

                              {/* Quick Presets */}
                              <div>
                                <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1.5">
                                  Quick Real Screenshot Presets:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {[
                                    { label: "Daily Finance Dashboard", url: "/images/daily-finance-dashboard.jpg" },
                                    { label: "Analytics & Budget", url: "/images/daily-finance-analytics.jpg" },
                                    { label: "App Tester Hub", url: "/images/app-tester-hub.jpg" },
                                  ].map((preset) => (
                                    <button
                                      key={preset.url}
                                      type="button"
                                      onClick={() => handleUpdateHero(item.id, { image: preset.url })}
                                      className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                                        item.image === preset.url
                                          ? "bg-[#34d399]/20 border-[#34d399]/40 text-[#34d399] font-bold"
                                          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                      }`}
                                    >
                                      {preset.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Metadata Fields */}
                          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                Screen / Tab Title
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateHero(item.id, { title: e.target.value })}
                                placeholder="Daily Finance"
                                className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                Simulated Code File Name
                              </label>
                              <input
                                type="text"
                                value={item.file}
                                onChange={(e) => handleUpdateHero(item.id, { file: e.target.value })}
                                placeholder="DailyFinance.kt"
                                className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                Tech Tag (Top Right)
                              </label>
                              <input
                                type="text"
                                value={item.tag}
                                onChange={(e) => handleUpdateHero(item.id, { tag: e.target.value })}
                                placeholder="Native Compose"
                                className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                Category Badge (Bottom Info)
                              </label>
                              <input
                                type="text"
                                value={item.badge}
                                onChange={(e) => handleUpdateHero(item.id, { badge: e.target.value })}
                                placeholder="Android App"
                                className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                                Feature Description (Bottom Caption)
                              </label>
                              <input
                                type="text"
                                value={item.desc}
                                onChange={(e) => handleUpdateHero(item.id, { desc: e.target.value })}
                                placeholder="Optional feature highlight or description..."
                                className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GITHUB REPOSITORIES */}
              {activeTab === "GitHub" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                          Live GitHub Activity
                        </h2>
                        <span className="text-xs font-mono bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 px-2.5 py-0.5 rounded-full font-bold">
                          {githubList.length} Repos
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Customize repositories, descriptions, primary languages, and star badges displayed in the Live GitHub Activity showcase on the homepage.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={handleOpenGithubBrowser}
                        className="flex items-center gap-1.5 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3.5 py-2 text-xs font-mono text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-all cursor-pointer shadow-sm"
                        title="Browse and select any repositories from your GitHub account"
                      >
                        <FolderGit2 size={14} />
                        <span>Browse & Select Repos</span>
                      </button>

                      <button
                        onClick={handleSyncGithubFromAPI}
                        disabled={isSyncingGithub}
                        className="flex items-center gap-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] transition-all cursor-pointer disabled:opacity-50"
                        title="Fetch latest public repositories from github.com/Subhan-Haider"
                      >
                        <RefreshCw size={13} className={isSyncingGithub ? "animate-spin text-[#34d399]" : ""} />
                        <span>{isSyncingGithub ? "Syncing..." : "Sync from GitHub"}</span>
                      </button>

                      <button
                        onClick={handleOpenCreateGithubRepo}
                        className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                      >
                        <Plus size={15} />
                        <span>Add Repo Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Search / Filter */}
                  <div className="mt-6 relative">
                    <Search size={15} className="absolute left-4 top-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      placeholder="Filter GitHub repositories by name, language, or description..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] pl-11 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#34d399] focus:outline-none"
                    />
                  </div>

                  {/* Grid of Repository Cards */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {githubList
                      .filter(
                        (repo) =>
                          repo.name.toLowerCase().includes(search.toLowerCase()) ||
                          repo.language.toLowerCase().includes(search.toLowerCase()) ||
                          repo.description.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((repo, index) => {
                        return (
                          <div
                            key={repo.name + index}
                            className="group flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 hover:border-[var(--border-active)] transition-all relative overflow-hidden shadow-sm"
                          >
                            <div>
                              {/* Top Bar */}
                              <div className="flex items-center justify-between text-[#64748b]">
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-[#34d399]">
                                  <FolderGit2 size={16} />
                                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                                    Card #{index + 1}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleMoveGithubRepo(index, "up")}
                                    disabled={index === 0}
                                    className="p-1 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-20 cursor-pointer"
                                    title="Move Left / Up"
                                  >
                                    <ArrowUp size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleMoveGithubRepo(index, "down")}
                                    disabled={index === githubList.length - 1}
                                    className="p-1 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-20 cursor-pointer"
                                    title="Move Right / Down"
                                  >
                                    <ArrowDown size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Title & Link */}
                              <div className="mt-3 flex items-baseline justify-between gap-2">
                                <h4 className="font-display font-bold text-[var(--text-primary)] text-base truncate">
                                  {repo.name}
                                </h4>
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[var(--text-muted)] hover:text-[#34d399] transition-colors shrink-0"
                                  title="Open in GitHub"
                                >
                                  <ExternalLink size={13} />
                                </a>
                              </div>

                              {/* Description */}
                              <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                                {repo.description || "Open source experiment and code shared on GitHub."}
                              </p>
                            </div>

                            {/* Bottom Info & Action buttons */}
                            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                              <div className="flex items-center gap-3 text-[11px] font-mono">
                                <span className="text-emerald-600 dark:text-[#34d399] font-medium flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                                  {repo.language || "Code"}
                                </span>
                                <span className="flex items-center gap-1 text-[#64748b]">
                                  <Star size={11} /> {repo.stars}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleOpenEditGithubRepo(repo)}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                                  title="Edit Repository Details"
                                >
                                  <Edit2 size={11} />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteGithubRepo(repo.name)}
                                  className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                                  title="Delete Repository Card"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {githubList.length === 0 && (
                    <div className="mt-8 rounded-2xl border border-dashed border-[var(--border-medium)] p-12 text-center">
                      <FolderGit2 size={36} className="mx-auto text-[var(--text-muted)] opacity-50 mb-3" />
                      <h3 className="font-display font-bold text-[var(--text-primary)] text-sm">
                        No GitHub Repositories Configured
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm mx-auto">
                        Add repository cards manually or sync the latest public repos from your GitHub profile.
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          onClick={handleSyncGithubFromAPI}
                          className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--border-active)] transition-all cursor-pointer"
                        >
                          Sync from GitHub
                        </button>
                        <button
                          onClick={handleOpenCreateGithubRepo}
                          className="px-4 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-all cursor-pointer"
                        >
                          + Add Repo Card
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: EXTENSIONS */}
              {activeTab === "Extensions" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Extensions & Tools</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Manage browser extensions, developer tools, and store listings
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateExtension}
                      className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2.5 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Extension</span>
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {extensionList.map((ext) => (
                      <div
                        key={ext.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 hover:border-[var(--border-active)] transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="mt-1 w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: ext.color }}
                          />
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-base font-bold text-[var(--text-primary)]">{ext.name}</h3>
                              <span className="text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
                                {ext.role}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] max-w-xl">{ext.desc}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {ext.platforms.map((p, i) => (
                                <a
                                  key={i}
                                  href={p.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                  {p.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={ext.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            title="Visit site"
                          >
                            <ExternalLink size={13} />
                          </a>
                          <button
                            onClick={() => handleOpenEditExtension(ext)}
                            className="p-2 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                            title="Edit extension"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteExtension(ext.name)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Delete extension"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {extensionList.length === 0 && (
                      <div className="py-12 text-center text-xs text-[var(--text-muted)]">
                        No extensions yet. Add your first one.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS MATRIX */}
              {activeTab === "Skills" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Technical Skills Matrix</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Configure frameworks, languages, Android SDK tools, and proficiencies
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsCreatingCategory(true)}
                        className="flex items-center gap-1.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-surface)] transition-all cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Category</span>
                      </button>
                      <button
                        onClick={() => setIsCreatingSkill(true)}
                        className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {categories.map((cat) => (
                      <div
                        key={cat.category}
                        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 space-y-4"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                          <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">
                            {cat.category}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded-full">
                              {cat.items.length} skills
                            </span>
                            <button
                              onClick={() => {
                                setEditingCategory(cat.category);
                                setEditCategoryName(cat.category);
                              }}
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors cursor-pointer"
                              title="Edit category"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.category)}
                              className="text-[var(--text-muted)] hover:text-red-500 p-1 transition-colors cursor-pointer"
                              title="Remove category"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {cat.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono group hover:border-[var(--border-medium)]"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[var(--text-primary)] font-medium">{item.name}</span>
                                <span className="text-[10px] text-[var(--text-muted)]">({item.level})</span>
                              </div>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditingSkill({ catName: cat.category, skillName: item.name, level: item.level });
                                    setEditSkillForm({ name: item.name, level: item.level });
                                  }}
                                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 transition-colors cursor-pointer"
                                  title="Edit skill"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteSkill(cat.category, item.name)}
                                  className="text-[var(--text-muted)] hover:text-red-500 p-1 transition-colors cursor-pointer"
                                  title="Remove skill"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: JOURNEY MILESTONES */}
              {activeTab === "Journey" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Journey &amp; Milestones</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Timeline milestones displayed on the homepage story section
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateJourney}
                      className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-4 py-2 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {journeyList.map((item) => (
                      <div
                        key={item.title}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-5 hover:border-[var(--border-active)] transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono text-[#34d399] font-bold">
                              {item.year}
                            </span>
                            <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">
                              {item.title}
                            </h3>
                            <span className="text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] max-w-2xl">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditJourney(item)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                          >
                            <Edit2 size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteJourney(item.title)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Delete milestone"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MESSAGES INBOX */}
              {activeTab === "Messages" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Inquiries Inbox</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Contact form submissions, developer inquiries, and collaboration proposals
                      </p>
                    </div>

                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {messages.length} total messages
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {messages.length === 0 ? (
                      <div className="py-12 text-center text-xs text-[var(--text-muted)]">
                        Inbox is empty. No messages yet.
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition-all ${
                            m.read
                              ? "border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]"
                              : "border-[#34d399]/40 bg-[#34d399]/[0.05]"
                          }`}
                        >
                          <div
                            className="space-y-1 cursor-pointer flex-1"
                            onClick={() => {
                              setViewingMessage(m);
                              if (!m.read) handleToggleMessageRead(m.id);
                            }}
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              {!m.read && (
                                <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                              )}
                              <span className="text-sm font-bold text-[var(--text-primary)]">{m.name}</span>
                              <span className="text-xs font-mono text-[var(--text-muted)]">
                                &lt;{m.email}&gt;
                              </span>
                              <span className="text-[10px] font-mono bg-[var(--bg-surface)] text-[#34d399] border border-[var(--border-subtle)] px-2 py-0.5 rounded-full">
                                {m.topic}
                              </span>
                            </div>
                            <h4 className="text-xs font-semibold text-[var(--text-primary)]">{m.subject}</h4>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{m.message}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-[var(--text-muted)] mr-2">
                              {m.date}
                            </span>
                            <button
                              onClick={() => {
                                setViewingMessage(m);
                                if (!m.read) handleToggleMessageRead(m.id);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
                            >
                              Read
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: SITE & PROFILE SETTINGS */}
              {activeTab === "Settings" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Profile &amp; Site Configuration</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Update personal branding, availability badge, and social URLs
                      </p>
                    </div>

                    <button
                      onClick={() => handleSaveSettings()}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-5 py-2 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7] cursor-pointer"
                    >
                      <Check size={14} />
                      <span>{isSaving ? "Saving..." : "Save Settings"}</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveSettings} className="mt-6 space-y-6 max-w-2xl">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={settings.name}
                          onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                          className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                        Display Tagline
                      </label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                        Bio / Short Description
                      </label>
                      <textarea
                        rows={3}
                        value={settings.bio}
                        onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                          GitHub Profile URL
                        </label>
                        <input
                          type="text"
                          value={settings.github}
                          onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                          className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">
                          Tester Portal URL
                        </label>
                        <input
                          type="text"
                          value={settings.testerUrl}
                          onChange={(e) =>
                            setSettings({ ...settings, testerUrl: e.target.value })
                          }
                          className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                        />
                      </div>
                    </div>
                  </form>

                  {/* Resume / CV Card */}
                  <div className="mt-8 max-w-2xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-[#a855f7]" />
                        <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Resume / CV Document</h3>
                      </div>
                      {settings.resumeUrl && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setResumePreviewOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#a855f7]/15 text-[#a855f7] border border-[#a855f7]/30 text-[11px] font-mono hover:bg-[#a855f7]/25 transition-colors cursor-pointer"
                          >
                            <Maximize2 size={11} />
                            Preview
                          </button>
                          <button
                            onClick={handleResumeDownload}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-[11px] font-mono hover:bg-[#38bdf8]/25 transition-colors cursor-pointer"
                          >
                            <Download size={11} />
                            Download
                          </button>
                          <button
                            onClick={handleResumeClear}
                            className="p-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                            title="Clear resume"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Active resume display */}
                    {settings.resumeUrl && (
                      <div className="flex items-center gap-3 rounded-xl border border-[#a855f7]/30 bg-[#a855f7]/5 px-4 py-3">
                        <FileText size={18} className="text-[#a855f7] shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                            {settings.resumeFileName || "resume-subhan-haider.pdf"}
                          </p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)] truncate mt-0.5">
                            {settings.resumeUrl}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded-full">
                          Live Active
                        </span>
                      </div>
                    )}

                    {/* Paste URL */}
                    <div>
                      <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                        <LinkIcon size={11} /> Direct PDF URL or Google Drive link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://.../resume.pdf"
                          value={settings.resumeUrl}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              resumeUrl: e.target.value,
                              resumeFileName: prev.resumeFileName || "resume.pdf",
                            }))
                          }
                          className="flex-1 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#a855f7] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveSettings()}
                          className="px-4 py-2 rounded-xl bg-[#a855f7]/20 text-[#a855f7] text-xs font-bold hover:bg-[#a855f7]/30 transition-colors cursor-pointer"
                        >
                          Save URL
                        </button>
                      </div>
                    </div>

                    {/* Drag & Drop Upload */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setResumeDragOver(true); }}
                      onDragLeave={() => setResumeDragOver(false)}
                      onDrop={handleResumeDrop}
                      onClick={() => resumeFileRef.current?.click()}
                      className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer py-8 transition-all ${
                        resumeDragOver
                          ? "border-[#a855f7] bg-[#a855f7]/10"
                          : "border-[var(--border-medium)] bg-[var(--bg-surface)] hover:border-[#a855f7]/50 hover:bg-[#a855f7]/5"
                      }`}
                    >
                      <input
                        ref={resumeFileRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleResumeFile(e.target.files?.[0] ?? null)}
                      />
                      {uploadingResume ? (
                        <Activity size={24} className="text-[#a855f7] animate-spin" />
                      ) : (
                        <Upload size={22} className={resumeDragOver ? "text-[#a855f7]" : "text-[var(--text-muted)]"} />
                      )}
                      <div className="text-center">
                        <p className="text-xs font-semibold text-[var(--text-primary)]">
                          {uploadingResume
                            ? "Uploading PDF to server..."
                            : resumeDragOver
                            ? "Drop your PDF here"
                            : "Upload New PDF Resume"}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                          Drag & drop or click to browse — replaces live `/resume-subhan-haider.pdf`
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Security & Password Management Card */}
                  <div className="mt-8 max-w-2xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#34d399]" />
                        <h3 className="font-display text-sm font-bold text-[var(--text-primary)]">Admin Security &amp; Master Access</h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-2.5 py-0.5 rounded-full w-fit">
                        Authorized: setupg98@gmail.com
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)]">
                      Update your administrator credentials. Changes take effect immediately across all active sessions.
                    </p>

                    {passwordChangeMsg && (
                      <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                        passwordChangeMsg.type === "success" 
                          ? "bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399]" 
                          : "bg-red-500/10 border border-red-500/30 text-red-400"
                      }`}>
                        {passwordChangeMsg.type === "success" ? <Check size={14} /> : <AlertTriangle size={14} />}
                        <span>{passwordChangeMsg.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                          Current Password
                        </label>
                        <input
                          required
                          type="password"
                          placeholder="Enter current password (default: setupg98)"
                          value={currentPasswordInput}
                          onChange={(e) => setCurrentPasswordInput(e.target.value)}
                          className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                            New Password
                          </label>
                          <input
                            required
                            type="password"
                            placeholder="Min 6 characters"
                            value={newPasswordInput}
                            onChange={(e) => setNewPasswordInput(e.target.value)}
                            className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                            Confirm New Password
                          </label>
                          <input
                            required
                            type="password"
                            placeholder="Repeat new password"
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={changingPassword}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-all cursor-pointer disabled:opacity-50"
                        >
                          {changingPassword ? <RefreshCw size={13} className="animate-spin" /> : <Key size={13} />}
                          <span>{changingPassword ? "Updating..." : "Update Password"}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 6: DATABASE & SYNC HUB */}
              {activeTab === "Database" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Database &amp; Sync Hub</h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Inspect and manage persistent database state in `data.json`
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Ready &amp; Synced</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6 max-w-2xl">
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-6 space-y-4">
                      <h3 className="font-display text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Download size={15} className="text-[#38bdf8]" />
                        <span>Offline State &amp; Portable Backup</span>
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Download the entire portfolio state (all case studies, hero screenshots, skills matrix, milestones, and messages) into a portable single JSON file.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleExportJSON}
                          className="flex items-center gap-2 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 px-4 py-2 text-xs font-mono hover:bg-[#38bdf8]/25 transition-colors cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Export JSON Backup</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => persistData()}
                          disabled={isSaving}
                          className="flex items-center gap-2 rounded-full bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 px-4 py-2 text-xs font-mono hover:bg-[#34d399]/25 transition-colors cursor-pointer"
                        >
                          <Save size={13} />
                          <span>{isSaving ? "Saving..." : "Force Save Database"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CREATE / EDIT PROJECT MODAL */}
      {(isCreatingProject || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCreatingProject(false);
                setEditingProject(null);
              }}
              className="absolute right-6 top-6 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              {isCreatingProject ? "Create New Project" : `Edit Project: ${projectForm.title}`}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Configure project case study details, architecture highlights, and metadata
            </p>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Project Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={projectForm.title || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    required
                    type="text"
                    value={projectForm.slug || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Category Type
                  </label>
                  <select
                    value={projectForm.type || "Android"}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        type: e.target.value as Project["type"],
                      })
                    }
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                  >
                    <option value="Android">Android</option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Tool">Tool</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Experiment">Experiment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Release Year
                  </label>
                  <input
                    type="text"
                    value={projectForm.year || "2025"}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={projectForm.featured ?? true}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, featured: e.target.checked })
                    }
                    className="rounded border-[var(--border-medium)] text-[#34d399] focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="featured-check"
                    className="text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                  >
                    Featured on Home
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Tagline / Short Hook
                </label>
                <input
                  type="text"
                  value={projectForm.tagline || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  placeholder="Intelligent personal finance and expense tracking on Android"
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Summary
                </label>
                <textarea
                  rows={3}
                  value={projectForm.summary || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Kotlin, Jetpack Compose, Room DB, Coroutines"
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Real-time expense tracking&#10;Offline first SQLite DB&#10;Material 3 dynamic theming"
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-[var(--text-secondary)]">
                      Logo / Icon
                    </label>
                    <label className="text-[10px] text-[#34d399] hover:underline cursor-pointer flex items-center gap-1">
                      <Upload size={10} />
                      <span>{uploadingProjectLogo ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingProjectLogo}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingProjectLogo(true);
                          const uploaded = await uploadFile(file);
                          setUploadingProjectLogo(false);
                          if (uploaded) {
                            setProjectForm((prev) => ({ ...prev, logoUrl: uploaded.url }));
                            showToast("Image uploaded for project!");
                          }
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={projectForm.logoUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, logoUrl: e.target.value })}
                    placeholder="/images/logo.png"
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Live Demo / Tester URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://tester.subhan.tech/"
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.githubUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/Subhan-Haider/..."
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="px-5 py-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SKILL MODAL */}
      {isCreatingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
            <button
              onClick={() => setIsCreatingSkill(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={15} />
            </button>

            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Add Skill</h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Add a new technology or tool to the skills matrix
            </p>

            <form onSubmit={handleAddSkill} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Skill Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jetpack Glance"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                >
                  <option value="Primary">Primary</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingSkill(false)}
                  className="px-4 py-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] cursor-pointer hover:bg-[#6ee7b7]"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MESSAGE MODAL */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setViewingMessage(null)}
              className="absolute right-6 top-6 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30 px-2.5 py-0.5 rounded-full">
                {viewingMessage.topic}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">{viewingMessage.date}</span>
            </div>

            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mt-3">
              {viewingMessage.subject}
            </h2>

            <div className="mt-2 text-xs font-mono text-[var(--text-secondary)] pb-4 border-b border-[var(--border-subtle)]">
              From: <span className="text-[var(--text-primary)] font-bold">{viewingMessage.name}</span> (
              <a
                href={`mailto:${viewingMessage.email}`}
                className="text-[#34d399] hover:underline"
              >
                {viewingMessage.email}
              </a>
              )
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] p-4 text-xs text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
              {viewingMessage.message}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleDeleteMessage(viewingMessage.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-xs font-mono text-red-500 hover:bg-red-500/20 cursor-pointer"
              >
                <Trash2 size={12} />
                <span>Delete Message</span>
              </button>

              <a
                href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(
                  viewingMessage.subject
                )}`}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]"
              >
                <Mail size={13} />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT JOURNEY MODAL */}
      {(isCreatingJourney || editingJourney) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsCreatingJourney(false);
                setEditingJourney(null);
              }}
              className="absolute right-6 top-6 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={16} />
            </button>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
              {isCreatingJourney ? "Add Milestone" : "Edit Milestone"}
            </h2>
            <form onSubmit={handleSaveJourney} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Year / Phase</label>
                  <input required type="text" value={journeyForm.year} onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Badge</label>
                  <input required type="text" value={journeyForm.badge} onChange={(e) => setJourneyForm({ ...journeyForm, badge: e.target.value })} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Title</label>
                <input required type="text" value={journeyForm.title} onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Description</label>
                <textarea required rows={3} value={journeyForm.description} onChange={(e) => setJourneyForm({ ...journeyForm, description: e.target.value })} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] resize-none focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => { setIsCreatingJourney(false); setEditingJourney(null); }} className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] cursor-pointer">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
            <button
              onClick={() => setEditingCategory(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={15} />
            </button>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Edit Category</h2>
            <form onSubmit={handleSaveEditCategory} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Category Name</label>
                <input required type="text" value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] cursor-pointer">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SKILL MODAL */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
            <button
              onClick={() => setEditingSkill(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={15} />
            </button>

            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Edit Skill</h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Update skill details in {editingSkill.catName}
            </p>

            <form onSubmit={handleSaveEditSkill} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Skill Name *
                </label>
                <input
                  required
                  type="text"
                  value={editSkillForm.name}
                  onChange={(e) => setEditSkillForm({ ...editSkillForm, name: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={editSkillForm.level}
                  onChange={(e) => setEditSkillForm({ ...editSkillForm, level: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                >
                  <option value="Primary">Primary</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] cursor-pointer hover:bg-[#6ee7b7]"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isCreatingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl">
            <button
              onClick={() => setIsCreatingCategory(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={15} />
            </button>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Add Category</h2>
            <form onSubmit={handleAddCategory} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Category Name</label>
                <input required type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setIsCreatingCategory(false)} className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] cursor-pointer">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT EXTENSION MODAL */}
      {(isCreatingExtension || editingExtension) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsCreatingExtension(false); setEditingExtension(null); }}
              className="absolute right-6 top-6 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={16} />
            </button>

            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              {isCreatingExtension ? "Add Extension" : `Edit: ${editingExtension?.name}`}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Browser extension or tool listing details</p>

            <form onSubmit={handleSaveExtension} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Name *</label>
                  <input required type="text" value={extForm.name}
                    onChange={(e) => setExtForm({ ...extForm, name: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Role / Category *</label>
                  <input required type="text" value={extForm.role}
                    onChange={(e) => setExtForm({ ...extForm, role: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Website URL *</label>
                <input required type="url" value={extForm.url}
                  onChange={(e) => setExtForm({ ...extForm, url: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Description</label>
                <textarea value={extForm.desc} rows={2}
                  onChange={(e) => setExtForm({ ...extForm, desc: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={extForm.color}
                    onChange={(e) => setExtForm({ ...extForm, color: e.target.value })}
                    className="h-8 w-12 rounded cursor-pointer bg-transparent border border-[var(--border-medium)]" />
                  <input type="text" value={extForm.color}
                    onChange={(e) => setExtForm({ ...extForm, color: e.target.value })}
                    className="flex-1 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2">Store Platforms</label>
                <div className="space-y-2 mb-3">
                  {extForm.platforms.map((p, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-3 py-2">
                      <span className="text-xs font-mono text-[var(--text-primary)]">{p.label}</span>
                      <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[200px]">{p.href}</span>
                      <button type="button" onClick={() => handleRemoveExtPlatform(i)}
                        className="text-red-500 hover:text-red-400 shrink-0 cursor-pointer">
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[80px_1fr_60px_auto] gap-2 items-end">
                  <div>
                    <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">Label</label>
                    <input type="text" placeholder="Chrome" value={extPlatformInput.label}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, label: e.target.value })}
                      className="w-full rounded-lg border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-2 py-1.5 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">URL</label>
                    <input type="url" placeholder="https://..." value={extPlatformInput.href}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, href: e.target.value })}
                      className="w-full rounded-lg border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-2 py-1.5 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[var(--text-muted)] mb-1">Color</label>
                    <input type="color" value={extPlatformInput.color}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, color: e.target.value })}
                      className="h-[30px] w-full rounded cursor-pointer bg-transparent border border-[var(--border-medium)]" />
                  </div>
                  <button type="button" onClick={handleAddExtPlatform}
                    className="h-[30px] px-3 rounded-lg bg-[#34d399]/20 text-[#34d399] text-xs font-bold hover:bg-[#34d399]/30 transition-colors cursor-pointer">
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button type="button"
                  onClick={() => { setIsCreatingExtension(false); setEditingExtension(null); }}
                  className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] cursor-pointer">
                  {isCreatingExtension ? "Add Extension" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT GITHUB REPOSITORY MODAL */}
      {(isCreatingGithubRepo || editingGithubRepo) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCreatingGithubRepo(false);
                setEditingGithubRepo(null);
              }}
              className="absolute right-6 top-6 p-2 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 text-emerald-600 dark:text-[#34d399] mb-1">
              <FolderGit2 size={18} />
              <span className="text-xs font-mono font-bold tracking-wide uppercase">GitHub Repository Card</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              {isCreatingGithubRepo ? "Add Repository Card" : `Edit: ${editingGithubRepo?.name}`}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Configure name, description, primary language, and star metrics.
            </p>

            {/* Quick Auto-Fill Dropdown from GitHub */}
            {isCreatingGithubRepo && (
              <div className="mt-4 p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#38bdf8] flex items-center gap-1.5">
                    <Sparkles size={13} /> Quick Select from My GitHub
                  </span>
                  {availableGithubRepos.length === 0 ? (
                    <button
                      type="button"
                      onClick={handleRefreshAvailableRepos}
                      disabled={githubBrowserLoading}
                      className="text-[10px] font-mono text-[var(--text-muted)] hover:text-[#38bdf8] underline cursor-pointer"
                    >
                      {githubBrowserLoading ? "Loading..." : "Load Repositories"}
                    </button>
                  ) : (
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      {availableGithubRepos.length} Repos available
                    </span>
                  )}
                </div>
                {availableGithubRepos.length > 0 ? (
                  <select
                    onChange={(e) => {
                      const found = availableGithubRepos.find((r) => r.name === e.target.value);
                      if (found) handleSelectRepoForForm(found);
                    }}
                    defaultValue=""
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                  >
                    <option value="" disabled>-- Pick a repository to auto-fill fields --</option>
                    {availableGithubRepos.map((r) => (
                      <option key={r.name} value={r.name}>
                        {r.name} ({r.language || "Code"}) {r.stars > 0 ? `⭐ ${r.stars}` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Want to auto-fill from your GitHub account?
                    </p>
                    <button
                      type="button"
                      onClick={handleRefreshAvailableRepos}
                      disabled={githubBrowserLoading}
                      className="px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] text-[10px] font-mono hover:bg-[#38bdf8]/25 cursor-pointer transition-colors"
                    >
                      {githubBrowserLoading ? "Fetching..." : "Fetch My Repos"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSaveGithubRepo} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Repository Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. my-prof or Daily-Finance-Android"
                  value={githubForm.name}
                  onChange={(e) => setGithubForm({ ...githubForm, name: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  GitHub Target URL *
                </label>
                <input
                  required
                  type="url"
                  placeholder="https://github.com/Subhan-Haider/..."
                  value={githubForm.url}
                  onChange={(e) => setGithubForm({ ...githubForm, url: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Primary Language
                  </label>
                  <input
                    type="text"
                    placeholder="TypeScript"
                    value={githubForm.language}
                    onChange={(e) => setGithubForm({ ...githubForm, language: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none"
                  />
                  {/* Language Presets */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["TypeScript", "JavaScript", "Kotlin", "Python", "GDScript", "HTML", "Rust", "Go", "C++"].map(
                      (lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setGithubForm({ ...githubForm, language: lang })}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                            githubForm.language.toLowerCase() === lang.toLowerCase()
                              ? "bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40"
                              : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {lang}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    Stars Count
                  </label>
                  <div className="relative">
                    <Star size={13} className="absolute left-3.5 top-3 text-[var(--text-muted)]" />
                    <input
                      type="number"
                      min="0"
                      value={githubForm.stars}
                      onChange={(e) => setGithubForm({ ...githubForm, stars: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] pl-9 pr-3.5 py-2 text-xs text-[var(--text-primary)] font-mono focus:border-[#34d399] focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
                    Displayed with star badge on the card
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Open source experiment and code shared on GitHub."
                  value={githubForm.description}
                  onChange={(e) => setGithubForm({ ...githubForm, description: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:border-[#34d399] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* LIVE CARD PREVIEW */}
              <div className="pt-2">
                <label className="block text-[11px] font-mono text-[var(--text-muted)] uppercase mb-2">
                  Live Card Preview
                </label>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                  <div className="flex items-center justify-between text-[#64748b]">
                    <FolderGit2 size={16} />
                    <ArrowRight size={14} className="rotate-[-45deg]" />
                  </div>
                  <h4 className="mt-2 font-display font-bold text-[var(--text-primary)] text-sm truncate">
                    {githubForm.name || "repository-name"}
                  </h4>
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {githubForm.description || "Open source experiment and code shared on GitHub."}
                  </p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[#64748b]">
                    <span className="text-emerald-600 dark:text-[#34d399] font-medium">
                      {githubForm.language || "Code"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {githubForm.stars}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingGithubRepo(false);
                    setEditingGithubRepo(null);
                  }}
                  className="px-4 py-2 rounded-full bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-all cursor-pointer"
                >
                  {isCreatingGithubRepo ? "Add Repository" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GITHUB REPOSITORY EXPLORER & SELECTOR MODAL */}
      {isBrowsingGithubRepos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
              <div>
                <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
                  <FolderGit2 size={18} />
                  <span className="text-xs font-mono font-bold tracking-wide uppercase">
                    GitHub App Explorer
                  </span>
                  <span className="text-[10px] font-mono bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 px-2 py-0.5 rounded-full font-bold">
                    @Subhan-Haider
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Select & Add Repositories
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefreshAvailableRepos}
                  disabled={githubBrowserLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#38bdf8] transition-all cursor-pointer disabled:opacity-50"
                  title="Reload repositories from GitHub API"
                >
                  <RefreshCw size={13} className={githubBrowserLoading ? "animate-spin text-[#38bdf8]" : ""} />
                  <span className="hidden sm:inline">{githubBrowserLoading ? "Loading..." : "Refresh"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsBrowsingGithubRepos(false)}
                  className="p-2 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-3 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search repositories by name, language, or topic..."
                    value={githubSearchFilter}
                    onChange={(e) => setGithubSearchFilter(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] focus:border-[#38bdf8] focus:outline-none"
                  />
                  {githubSearchFilter && (
                    <button
                      onClick={() => setGithubSearchFilter("")}
                      className="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Selection Counter & Batch Action */}
                <div className="flex items-center gap-2 shrink-0">
                  {selectedRepoNames.length > 0 && (
                    <button
                      type="button"
                      onClick={handleImportSelectedRepos}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34d399] text-[#090a12] text-xs font-bold shadow-md hover:bg-[#6ee7b7] cursor-pointer transition-all"
                    >
                      <Check size={14} />
                      <span>Import Selected ({selectedRepoNames.length})</span>
                    </button>
                  )}
                  {availableGithubRepos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const filteredNames = availableGithubRepos
                          .filter((r) => {
                            const matchSearch =
                              r.name.toLowerCase().includes(githubSearchFilter.toLowerCase()) ||
                              r.description.toLowerCase().includes(githubSearchFilter.toLowerCase()) ||
                              (r.language && r.language.toLowerCase().includes(githubSearchFilter.toLowerCase()));
                            const matchLang =
                              githubLanguageFilter === "all" ||
                              (r.language && r.language.toLowerCase() === githubLanguageFilter.toLowerCase());
                            return matchSearch && matchLang;
                          })
                          .map((r) => r.name);

                        if (selectedRepoNames.length === filteredNames.length && filteredNames.length > 0) {
                          setSelectedRepoNames([]);
                        } else {
                          setSelectedRepoNames(filteredNames);
                        }
                      }}
                      className="px-3 py-2 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-surface-elevated)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                    >
                      {selectedRepoNames.length > 0 ? "Clear Selection" : "Select All Filtered"}
                    </button>
                  )}
                </div>
              </div>

              {/* Language Filter Pills */}
              {availableGithubRepos.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase shrink-0 mr-1">
                    Lang:
                  </span>
                  {["all", ...Array.from(new Set(availableGithubRepos.map((r) => r.language).filter(Boolean)))].map(
                    (lang: any) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setGithubLanguageFilter(lang)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-lg shrink-0 transition-colors cursor-pointer ${
                          githubLanguageFilter.toLowerCase() === lang.toLowerCase()
                            ? "bg-[#38bdf8] text-[#090a12] font-bold shadow-sm"
                            : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {lang === "all" ? "All Languages" : lang}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Repositories Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[var(--border-subtle)]">
              {githubBrowserLoading ? (
                <div className="py-16 text-center">
                  <RefreshCw size={28} className="animate-spin text-[#38bdf8] mx-auto mb-3" />
                  <p className="text-sm font-mono text-[var(--text-primary)] font-bold">
                    Fetching repositories from GitHub...
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Connecting to GitHub API using your GitHub App credentials.
                  </p>
                </div>
              ) : availableGithubRepos.length === 0 ? (
                <div className="py-16 text-center">
                  <FolderGit2 size={36} className="text-[var(--text-muted)] mx-auto mb-3 opacity-60" />
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    No repositories loaded yet
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm mx-auto">
                    Click refresh to pull all public and accessible repositories from your GitHub account.
                  </p>
                  <button
                    type="button"
                    onClick={handleRefreshAvailableRepos}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#38bdf8] text-[#090a12] text-xs font-bold hover:bg-[#7dd3fc] cursor-pointer transition-all"
                  >
                    <RefreshCw size={13} />
                    <span>Load My GitHub Repositories</span>
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {availableGithubRepos
                    .filter((r) => {
                      const matchSearch =
                        r.name.toLowerCase().includes(githubSearchFilter.toLowerCase()) ||
                        r.description.toLowerCase().includes(githubSearchFilter.toLowerCase()) ||
                        (r.language && r.language.toLowerCase().includes(githubSearchFilter.toLowerCase()));
                      const matchLang =
                        githubLanguageFilter === "all" ||
                        (r.language && r.language.toLowerCase() === githubLanguageFilter.toLowerCase());
                      return matchSearch && matchLang;
                    })
                    .map((repo) => {
                      const isSelected = selectedRepoNames.includes(repo.name);
                      const isAlreadyInShowcase = githubList.some(
                        (g) => g.name.toLowerCase() === repo.name.toLowerCase()
                      );

                      return (
                        <div
                          key={repo.name}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? "border-[#38bdf8] bg-[#38bdf8]/5 shadow-sm"
                              : isAlreadyInShowcase
                              ? "border-[var(--border-medium)] bg-[var(--bg-surface-elevated)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface-elevated)]"
                          }`}
                        >
                          {/* Selection Checkbox & Info */}
                          <div className="flex items-start gap-3.5 min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedRepoNames(selectedRepoNames.filter((n) => n !== repo.name));
                                } else {
                                  setSelectedRepoNames([...selectedRepoNames, repo.name]);
                                }
                              }}
                              className="mt-1 text-[var(--text-muted)] hover:text-[#38bdf8] transition-colors cursor-pointer shrink-0"
                            >
                              {isSelected ? (
                                <CheckSquare size={18} className="text-[#38bdf8]" />
                              ) : (
                                <Square size={18} />
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-display font-bold text-sm text-[var(--text-primary)] hover:text-[#38bdf8] transition-colors flex items-center gap-1"
                                >
                                  <span>{repo.name}</span>
                                  <ExternalLink size={12} className="opacity-60" />
                                </a>

                                {isAlreadyInShowcase && (
                                  <span className="text-[10px] font-mono font-bold bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Check size={10} /> Active in Showcase
                                  </span>
                                )}

                                {repo.isFork && (
                                  <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2 py-0.5 rounded-md">
                                    Fork
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                                {repo.description || "No description provided on GitHub."}
                              </p>

                              {/* Repo Meta Metrics */}
                              <div className="flex items-center gap-3.5 mt-2 text-[11px] font-mono text-[var(--text-muted)] flex-wrap">
                                <span className="text-emerald-500 dark:text-[#34d399] font-medium">
                                  {repo.language || "Code"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star size={11} className="text-amber-400" /> {repo.stars || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <GitFork size={11} /> {repo.forks || 0}
                                </span>
                                {repo.updatedAt && (
                                  <span className="text-[10px] opacity-75">
                                    Updated: {new Date(repo.updatedAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Add / Auto-Fill Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleImportSingleRepo(repo)}
                              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                isAlreadyInShowcase
                                  ? "bg-[var(--bg-surface)] border border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#34d399]"
                                  : "bg-[#34d399] text-[#090a12] hover:bg-[#6ee7b7] shadow-sm"
                              }`}
                            >
                              <Check size={12} />
                              <span>{isAlreadyInShowcase ? "Update Card" : "+ Add to Showcase"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                {availableGithubRepos.length} Total Repositories available
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsBrowsingGithubRepos(false)}
                  className="px-4 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Close
                </button>
                {selectedRepoNames.length > 0 && (
                  <button
                    type="button"
                    onClick={handleImportSelectedRepos}
                    className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7] transition-all cursor-pointer shadow-md"
                  >
                    Import ({selectedRepoNames.length}) Repositories
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* RESUME PREVIEW MODAL */}
      {resumePreviewOpen && settings.resumeUrl && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-[#a855f7]" />
              <span className="text-sm font-bold text-white">
                {settings.resumeFileName || "Resume Preview"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResumeDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-mono hover:bg-[#38bdf8]/25 transition-colors cursor-pointer"
              >
                <Download size={13} />
                Download
              </button>
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/15 transition-colors"
              >
                <ExternalLink size={13} />
                Open Tab
              </a>
              <button
                onClick={() => setResumePreviewOpen(false)}
                className="p-2 rounded-full bg-white/10 text-[#94a3b8] hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <iframe
            src={settings.resumeUrl}
            className="flex-1 w-full border-0"
            title="Resume Preview"
          />
        </div>
      )}
    </main>
  );
}
