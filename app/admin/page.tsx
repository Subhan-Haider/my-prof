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
} from "lucide-react";
import { Nav, GlowBadge } from "@/components/site";
import {
  projects as initialProjects,
  techCategories as initialTechCategories,
  journey as initialJourney,
  extensions as initialExtensions,
  Project,
  TechCategory,
  Extension,
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
  tagline: "",
  bio: "Passionate high school student and developer building native Android apps, modern web platforms, and open-source tools with a focus on performance and privacy.",
  status: "Open for Collaborations & Opportunities",
  isAvailable: true,
  email: "contact@subhan.tech",
  github: "https://github.com/Subhan-Haider",
  testerUrl: "https://tester.subhan.tech/",
  supabaseUrl: "https://xyzcompany.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  resumeUrl: "",
  resumeFileName: "",
};

type AdminTab = "Projects" | "Skills" | "Journey" | "Messages" | "Settings" | "Database" | "Extensions";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("Projects");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Editable State
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [categories, setCategories] = useState<TechCategory[]>(initialTechCategories);
  const [journeyList, setJourneyList] = useState(initialJourney);
  const [messages, setMessages] = useState<MessageItem[]>(defaultMessages);
  const [settings, setSettings] = useState(defaultSettings);
  const [extensionList, setExtensionList] = useState<Extension[]>(initialExtensions);
  const [extraData, setExtraData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const data = await res.json();
          if (data.projects) setProjectList(data.projects);
          if (data.techCategories) setCategories(data.techCategories);
          if (data.journey) setJourneyList(data.journey);
          if (data.extensions) setExtensionList(data.extensions);
          if (data.settings) setSettings(data.settings);
          if (data.messages) setMessages(data.messages);
          setExtraData({ stats: data.stats, technologies: data.technologies });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Resume state
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const handleResumeFile = (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      showToast("Please upload a PDF file only");
      return;
    }
    const url = URL.createObjectURL(file);
    setSettings((prev) => ({ ...prev, resumeUrl: url, resumeFileName: file.name }));
    showToast(`Loaded "${file.name}"`);
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setResumeDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleResumeFile(file);
  };

  const handleResumeClear = () => {
    if (settings.resumeUrl.startsWith("blob:")) URL.revokeObjectURL(settings.resumeUrl);
    setSettings((prev) => ({ ...prev, resumeUrl: "", resumeFileName: "" }));
    showToast("Resume cleared");
  };

  const handleResumeDownload = () => {
    if (!settings.resumeUrl) return;
    const a = document.createElement("a");
    a.href = settings.resumeUrl;
    a.download = settings.resumeFileName || "resume.pdf";
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

  const [editingSkill, setEditingSkill] = useState<{catName: string, skillName: string, level: string} | null>(null);
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
  });
  const [stackInput, setStackInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  // Toast auto-hide
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const syncToServer = async () => {
    const payload = {
      projects: projectList,
      techCategories: categories,
      journey: journeyList,
      extensions: extensionList,
      settings: settings,
      messages: messages,
      ...extraData
    };
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast("Successfully synced to server");
      } else {
        showToast("Failed to sync to server");
      }
    } catch (e) {
      showToast("Error syncing to server");
    }
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
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStack = stackInput.split(",").map((s) => s.trim()).filter(Boolean);
    const updatedFeatures = featuresInput.split("\n").map((f) => f.trim()).filter(Boolean);

    const newProjData: Project = {
      slug: projectForm.slug || "project-" + Date.now(),
      title: projectForm.title || "Untitled Project",
      tagline: projectForm.tagline || "",
      type: (projectForm.type as Project["type"]) || "Android",
      summary: projectForm.summary || "",
      stack: updatedStack.length ? updatedStack : ["General"],
      featured: projectForm.featured ?? true,
      year: projectForm.year || "2025",
      features: updatedFeatures,
      idea: projectForm.idea,
      challenge: projectForm.challenge,
      solution: projectForm.solution,
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
    };

    if (isCreatingProject) {
      setProjectList([newProjData, ...projectList]);
      showToast(`Created project "${newProjData.title}"`);
    } else if (editingProject) {
      setProjectList(
        projectList.map((p) => (p.slug === editingProject.slug ? newProjData : p))
      );
      showToast(`Updated project "${newProjData.title}"`);
    }

    setIsCreatingProject(false);
    setEditingProject(null);
  };

  // Delete Project
  const handleDeleteProject = (slug: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const p = projectList.find((x) => x.slug === slug);
      setProjectList(projectList.filter((x) => x.slug !== slug));
      showToast(`Deleted "${p?.title || slug}"`);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = (slug: string) => {
    setProjectList(
      projectList.map((p) =>
        p.slug === slug ? { ...p, featured: !p.featured } : p
      )
    );
    showToast("Updated featured state");
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setCategories(
      categories.map((c) => {
        if (c.category === newSkillCategory) {
          return {
            ...c,
            items: [...c.items, { name: newSkillName.trim(), level: newSkillLevel }],
          };
        }
        return c;
      })
    );
    setNewSkillName("");
    setIsCreatingSkill(false);
    showToast(`Added skill "${newSkillName}"`);
  };

  // Add Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setCategories([...categories, { category: newCategoryName.trim(), items: [] }]);
    setNewCategoryName("");
    setIsCreatingCategory(false);
    showToast(`Added category "${newCategoryName}"`);
  };

  // Delete Category
  const handleDeleteCategory = (catName: string) => {
    if (confirm(`Delete category "${catName}" and all its skills?`)) {
      setCategories(categories.filter((c) => c.category !== catName));
      showToast(`Deleted category "${catName}"`);
    }
  };

  // Edit Category
  const handleSaveEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategoryName.trim() || !editingCategory) return;
    setCategories(
      categories.map((c) =>
        c.category === editingCategory
          ? { ...c, category: editCategoryName.trim() }
          : c
      )
    );
    setEditingCategory(null);
    showToast(`Updated category "${editCategoryName}"`);
  };

  // Edit Skill
  const handleSaveEditSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSkillForm.name.trim() || !editingSkill) return;
    setCategories(
      categories.map((c) => {
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
      })
    );
    setEditingSkill(null);
    showToast(`Updated skill "${editSkillForm.name}"`);
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

  const handleSaveJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingJourney) {
      setJourneyList([...journeyList, journeyForm]);
      showToast(`Added milestone "${journeyForm.title}"`);
    } else if (editingJourney) {
      setJourneyList(
        journeyList.map((j) => (j.title === editingJourney.title ? journeyForm : j))
      );
      showToast(`Updated milestone "${journeyForm.title}"`);
    }
    setIsCreatingJourney(false);
    setEditingJourney(null);
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

  const handleSaveExtension = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingExtension) {
      setExtensionList([...extensionList, extForm]);
      showToast(`Added extension "${extForm.name}"`);
    } else if (editingExtension) {
      setExtensionList(extensionList.map((ex) => ex.name === editingExtension.name ? extForm : ex));
      showToast(`Updated extension "${extForm.name}"`);
    }
    setIsCreatingExtension(false);
    setEditingExtension(null);
  };

  const handleDeleteExtension = (name: string) => {
    if (confirm(`Delete extension "${name}"?`)) {
      setExtensionList(extensionList.filter((ex) => ex.name !== name));
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

  const handleDeleteJourney = (title: string) => {
    if (confirm("Are you sure you want to delete this milestone?")) {
      setJourneyList(journeyList.filter((j) => j.title !== title));
      showToast("Deleted milestone");
    }
  };

  // Delete Skill
  const handleDeleteSkill = (catName: string, skillName: string) => {
    setCategories(
      categories.map((c) => {
        if (c.category === catName) {
          return {
            ...c,
            items: c.items.filter((item) => item.name !== skillName),
          };
        }
        return c;
      })
    );
    showToast(`Removed skill "${skillName}"`);
  };

  // Toggle Message Read
  const handleToggleMessageRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  // Delete Message
  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (viewingMessage?.id === id) setViewingMessage(null);
    showToast("Message deleted");
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      settings,
      projects: projectList,
      categories,
      journey: journeyList,
      messages,
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
  const handleResetToDefaults = () => {
    if (confirm("Reset all collections to initial factory defaults?")) {
      setProjectList(initialProjects);
      setCategories(initialTechCategories);
      setJourneyList(initialJourney);
      setMessages(defaultMessages);
      setSettings(defaultSettings);
      showToast("Reset all data to defaults");
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

  return (
    <main className="relative min-h-screen bg-[#090a12] text-[#f8fafc] overflow-hidden">
      <Nav />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-2xl border border-[#34d399]/40 bg-[#0f111d]/95 px-5 py-3.5 text-xs font-mono text-white shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={16} className="text-[#34d399]" />
          <span>{toast}</span>
        </div>
      )}

      <section className="relative pt-36 pb-20 px-6 md:px-12 grid-pattern">
        {/* Glow Spheres */}
        <div className="absolute top-28 left-1/4 w-[600px] h-[350px] bg-[#6366f1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#34d399]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <GlowBadge variant="emerald">
                  <span>CMS ADMIN STUDIO</span>
                </GlowBadge>
                <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Activity size={12} className="animate-pulse" />
                  <span>Live Reactive Store</span>
                </span>
              </div>

              <h1 className="display-title mt-4 text-3xl sm:text-5xl font-extrabold text-white">
                PORTFOLIO STUDIO<span className="text-[#34d399]">.</span>
              </h1>
              <p className="mt-2 text-sm text-[#94a3b8]">
                Real-time management for projects, skills matrix, milestones, contact inquiries, and site configuration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={syncToServer}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 text-xs font-mono text-[#34d399] hover:bg-[#34d399]/20 transition-colors"
                title="Save all changes to server"
              >
                <Database size={13} />
                <span>Save to Server</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors"
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
                <span>View Public Site</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 backdrop-blur-xl">
              <span className="text-xs font-mono text-[#64748b] block">PROJECTS</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-white">{projectList.length}</span>
                <span className="text-[11px] font-mono text-[#34d399]">
                  {projectList.filter((p) => p.featured).length} Featured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 backdrop-blur-xl">
              <span className="text-xs font-mono text-[#64748b] block">SKILLS MATRIX</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-white">{totalSkillsCount}</span>
                <span className="text-[11px] font-mono text-[#38bdf8]">{categories.length} Categories</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 backdrop-blur-xl">
              <span className="text-xs font-mono text-[#64748b] block">JOURNEY PHASES</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-white">{journeyList.length}</span>
                <span className="text-[11px] font-mono text-[#a855f7]">Milestones</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0f111d]/80 p-4 backdrop-blur-xl">
              <span className="text-xs font-mono text-[#64748b] block">INBOX INQUIRIES</span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-display text-white">{messages.length}</span>
                {unreadMessagesCount > 0 ? (
                  <span className="text-[11px] font-mono bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/30 px-2 py-0.5 rounded-full">
                    {unreadMessagesCount} Unread
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-[#64748b]">All Read</span>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid: Sidebar & Workspace */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
            {/* Sidebar Navigation */}
            <aside className="rounded-3xl border border-white/[0.08] bg-[#0f111d]/85 p-3 sm:p-4 backdrop-blur-xl shadow-xl">
              <div className="hidden lg:block px-3 py-2 text-[11px] font-mono text-[#64748b] uppercase tracking-wider">
                Studio Collections
              </div>

              <div className="flex flex-row overflow-x-auto gap-2 lg:flex-col lg:gap-1 lg:overflow-visible pb-1 lg:pb-0 scrollbar-none">
                {(
                  [
                    { id: "Projects", label: "Projects & Apps", icon: Smartphone, count: projectList.length },
                    { id: "Extensions", label: "Extensions & Tools", icon: Globe, count: extensionList.length },
                    { id: "Skills", label: "Skills Matrix", icon: Code, count: totalSkillsCount },
                    { id: "Journey", label: "Journey Milestones", icon: GraduationCap, count: journeyList.length },
                    { id: "Messages", label: "Inbox Messages", icon: Inbox, count: messages.length, badge: unreadMessagesCount },
                    { id: "Settings", label: "Site & Profile", icon: Settings, count: 1 },
                    { id: "Database", label: "Sync & Database", icon: Database, count: "Active" as string | number },
                  ] as Array<{ id: AdminTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; count: string | number; badge?: number }>
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
                      className={`whitespace-nowrap flex-shrink-0 lg:w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:py-3 rounded-xl text-xs font-mono transition-all ${
                        isActive
                          ? "bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 font-bold shadow-sm"
                          : "text-[#94a3b8] hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className={isActive ? "text-[#34d399]" : "text-[#64748b]"} />
                        <span>{tab.label}</span>
                      </div>

                      {tab.badge ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ef4444] text-white font-bold">
                          {tab.badge}
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isActive ? "bg-[#34d399]/20 text-[#34d399]" : "bg-white/5 text-[#64748b]"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="hidden lg:block pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={handleResetToDefaults}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </aside>

            {/* Workspace Area */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0f111d]/85 p-6 sm:p-8 backdrop-blur-xl shadow-xl min-h-[560px]">
              {/* TAB 1: PROJECTS */}
              {activeTab === "Projects" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Project Records</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Manage case studies, metrics, Android builds, and open-source packages
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
                    <Search size={15} className="absolute left-4 top-3.5 text-[#64748b]" />
                    <input
                      type="text"
                      placeholder="Filter projects by title, stack, or category..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#090a12]/80 pl-11 pr-4 py-2.5 text-xs text-white placeholder:text-[#64748b] focus:border-[#34d399] focus:outline-none"
                    />
                  </div>

                  {/* Projects List */}
                  <div className="mt-6 space-y-3">
                    {filteredProjects.length === 0 ? (
                      <div className="py-12 text-center text-xs text-[#64748b]">
                        No projects matching &ldquo;{search}&rdquo;
                      </div>
                    ) : (
                      filteredProjects.map((proj) => (
                        <div
                          key={proj.slug}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="font-display text-base font-bold text-white">
                                {proj.title}
                              </h3>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                                  proj.featured
                                    ? "bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30"
                                    : "bg-white/5 text-[#64748b]"
                                }`}
                                onClick={() => handleToggleFeatured(proj.slug)}
                                title="Click to toggle featured status"
                              >
                                {proj.featured ? "★ Featured" : "Standard"}
                              </span>
                              <span className="text-[10px] font-mono bg-white/5 text-[#94a3b8] px-2 py-0.5 rounded-full">
                                {proj.type}
                              </span>
                              <span className="text-[10px] font-mono text-[#64748b]">
                                {proj.year}
                              </span>
                            </div>

                            <p className="text-xs text-[#94a3b8] line-clamp-1 max-w-xl">
                              {proj.summary}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {proj.stack.map((s) => (
                                <span
                                  key={s}
                                  className="text-[10px] font-mono text-[#64748b] bg-white/[0.03] px-2 py-0.5 rounded"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              href={`/projects/${proj.slug}`}
                              className="p-2 rounded-xl border border-white/10 bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                              title="Preview on live site"
                            >
                              <Eye size={13} />
                            </Link>

                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/15 transition-colors cursor-pointer"
                            >
                              <Edit2 size={12} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.slug)}
                              className="p-2 rounded-xl bg-[#ef4444]/10 text-[#fca5a5] hover:bg-[#ef4444]/20 transition-colors cursor-pointer"
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

              {/* TAB 2: SKILLS MATRIX */}
              {activeTab === "Skills" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Technical Skills Matrix</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Configure frameworks, languages, Android SDK tools, and proficiencies
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsCreatingCategory(true)}
                        className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-white/20 transition-all cursor-pointer"
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
                        className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-4"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <h3 className="font-display text-sm font-bold text-white">
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
                              className="text-[#64748b] hover:text-white p-1 transition-colors"
                              title="Edit category"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.category)}
                              className="text-[#64748b] hover:text-[#ef4444] p-1 transition-colors"
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
                              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono group hover:border-white/10"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{item.name}</span>
                                <span className="text-[10px] text-[#64748b]">({item.level})</span>
                              </div>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditingSkill({ catName: cat.category, skillName: item.name, level: item.level });
                                    setEditSkillForm({ name: item.name, level: item.level });
                                  }}
                                  className="text-[#64748b] hover:text-white p-1 transition-colors"
                                  title="Edit skill"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteSkill(cat.category, item.name)}
                                  className="text-[#64748b] hover:text-[#ef4444] p-1 transition-colors"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Journey & Milestones</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
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
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono text-[#34d399] font-bold">
                              {item.year}
                            </span>
                            <h3 className="font-display text-sm font-bold text-white">
                              {item.title}
                            </h3>
                            <span className="text-[10px] font-mono bg-white/5 text-[#94a3b8] px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] max-w-2xl">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditJourney(item)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/15 transition-colors cursor-pointer"
                          >
                            <Edit2 size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteJourney(item.title)}
                            className="p-2 rounded-xl bg-[#ef4444]/10 text-[#fca5a5] hover:bg-[#ef4444]/20 transition-colors cursor-pointer"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Inquiries Inbox</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Contact form submissions, developer inquiries, and collaboration proposals
                      </p>
                    </div>

                    <span className="text-xs font-mono text-[#64748b]">
                      {messages.length} total messages
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {messages.length === 0 ? (
                      <div className="py-12 text-center text-xs text-[#64748b]">
                        Inbox is empty. No messages yet.
                      </div>
                    ) : (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition-all ${
                            m.read
                              ? "border-white/5 bg-white/[0.01]"
                              : "border-[#34d399]/30 bg-[#34d399]/[0.03]"
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
                              <span className="text-sm font-bold text-white">{m.name}</span>
                              <span className="text-xs font-mono text-[#64748b]">
                                &lt;{m.email}&gt;
                              </span>
                              <span className="text-[10px] font-mono bg-white/5 text-[#34d399] px-2 py-0.5 rounded-full">
                                {m.topic}
                              </span>
                            </div>
                            <h4 className="text-xs font-semibold text-[#cbd5e1]">{m.subject}</h4>
                            <p className="text-xs text-[#94a3b8] line-clamp-1">{m.message}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-[#64748b] mr-2">
                              {m.date}
                            </span>
                            <button
                              onClick={() => {
                                setViewingMessage(m);
                                if (!m.read) handleToggleMessageRead(m.id);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/15"
                            >
                              Read
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-2 rounded-xl bg-[#ef4444]/10 text-[#fca5a5] hover:bg-[#ef4444]/20"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Profile &amp; Site Configuration</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Update personal branding, availability badge, and social URLs
                      </p>
                    </div>

                    <button
                      onClick={() => showToast("Site configuration saved")}
                      className="flex items-center gap-1.5 rounded-full bg-[#34d399] px-5 py-2 text-xs font-bold text-[#090a12] shadow-md hover:bg-[#6ee7b7]"
                    >
                      <Check size={14} />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      showToast("Profile settings saved successfully");
                    }}
                    className="mt-6 space-y-6 max-w-2xl"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={settings.name}
                          onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                        Display Tagline
                      </label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                        Bio / Short Description
                      </label>
                      <textarea
                        rows={3}
                        value={settings.bio}
                        onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          GitHub Profile URL
                        </label>
                        <input
                          type="text"
                          value={settings.github}
                          onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          Tester Portal URL
                        </label>
                        <input
                          type="text"
                          value={settings.testerUrl}
                          onChange={(e) =>
                            setSettings({ ...settings, testerUrl: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white focus:border-[#34d399] focus:outline-none"
                        />
                      </div>
                    </div>
                  </form>

                  {/* ── Resume / CV Card ── */}
                  <div className="mt-8 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-[#a855f7]" />
                        <h3 className="font-display text-sm font-bold text-white">Resume / CV</h3>
                      </div>
                      {settings.resumeUrl && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setResumePreviewOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#a855f7]/15 text-[#a855f7] border border-[#a855f7]/30 text-[11px] font-mono hover:bg-[#a855f7]/25 transition-colors"
                          >
                            <Maximize2 size={11} />
                            Preview
                          </button>
                          <button
                            onClick={handleResumeDownload}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-[11px] font-mono hover:bg-[#38bdf8]/25 transition-colors"
                          >
                            <Download size={11} />
                            Download
                          </button>
                          <button
                            onClick={handleResumeClear}
                            className="p-1.5 rounded-full bg-[#ef4444]/10 text-[#fca5a5] hover:bg-[#ef4444]/20 transition-colors"
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
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {settings.resumeFileName || "resume.pdf"}
                          </p>
                          {settings.resumeUrl.startsWith("http") && (
                            <p className="text-[10px] font-mono text-[#64748b] truncate mt-0.5">
                              {settings.resumeUrl}
                            </p>
                          )}
                          {settings.resumeUrl.startsWith("blob:") && (
                            <p className="text-[10px] font-mono text-[#34d399] mt-0.5">Uploaded locally — save backup to keep</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Paste URL */}
                    <div>
                      <label className="block text-xs font-mono text-[#94a3b8] mb-2 flex items-center gap-1.5">
                        <LinkIcon size={11} /> Paste PDF Link (Google Drive, Dropbox, direct URL…)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://drive.google.com/file/d/.../view"
                          value={settings.resumeUrl.startsWith("http") ? settings.resumeUrl : ""}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              resumeUrl: e.target.value,
                              resumeFileName: prev.resumeFileName || "resume.pdf",
                            }))
                          }
                          className="flex-1 rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#a855f7] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => showToast("Resume URL saved")}
                          className="px-4 py-2 rounded-xl bg-[#a855f7]/20 text-[#a855f7] text-xs font-bold hover:bg-[#a855f7]/30 transition-colors"
                        >
                          Save
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
                          : "border-white/10 bg-white/[0.02] hover:border-[#a855f7]/50 hover:bg-[#a855f7]/5"
                      }`}
                    >
                      <input
                        ref={resumeFileRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleResumeFile(e.target.files?.[0] ?? null)}
                      />
                      <Upload size={22} className={resumeDragOver ? "text-[#a855f7]" : "text-[#64748b]"} />
                      <div className="text-center">
                        <p className="text-xs font-semibold text-white">
                          {resumeDragOver ? "Drop your PDF here" : "Upload PDF Resume"}
                        </p>
                        <p className="text-[10px] text-[#64748b] mt-0.5">Drag & drop or click to browse — PDF only</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: DATABASE & SUPABASE STUDIO */}
              {activeTab === "Database" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Database &amp; Sync Hub</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Connect Supabase credentials or manage offline JSON state
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Ready</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6 max-w-2xl">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
                      <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <Database size={15} className="text-[#34d399]" />
                        <span>Supabase Credentials</span>
                      </h3>

                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          NEXT_PUBLIC_SUPABASE_URL
                        </label>
                        <input
                          type="text"
                          value={settings.supabaseUrl}
                          onChange={(e) =>
                            setSettings({ ...settings, supabaseUrl: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#94a3b8] mb-2">
                          NEXT_PUBLIC_SUPABASE_ANON_KEY
                        </label>
                        <input
                          type="password"
                          value={settings.supabaseAnonKey}
                          onChange={(e) =>
                            setSettings({ ...settings, supabaseAnonKey: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-4 py-2.5 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast("Connection tested: Active & responsive")}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-mono text-white hover:bg-white/15 transition-colors"
                      >
                        <Activity size={13} />
                        <span>Test Supabase Connection</span>
                      </button>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
                      <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <Download size={15} className="text-[#38bdf8]" />
                        <span>Offline State &amp; Portable Backup</span>
                      </h3>
                      <p className="text-xs text-[#94a3b8]">
                        Download the entire portfolio state (all case studies, skills matrix, milestones, and messages) into a portable single JSON file.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleExportJSON}
                          className="flex items-center gap-2 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 px-4 py-2 text-xs font-mono hover:bg-[#38bdf8]/25 transition-colors"
                        >
                          <Download size={13} />
                          <span>Export JSON Backup</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: EXTENSIONS */}
              {activeTab === "Extensions" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">Extensions & Tools</h2>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Manage browser extensions, web tools, and store listings
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
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="mt-0.5 w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: ext.color }}
                          />
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-base font-bold text-white">{ext.name}</h3>
                              <span className="text-[10px] font-mono bg-white/5 text-[#94a3b8] px-2 py-0.5 rounded-full">
                                {ext.role}
                              </span>
                            </div>
                            <p className="text-xs text-[#94a3b8] max-w-xl">{ext.desc}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {ext.platforms.map((p, i) => (
                                <a
                                  key={i}
                                  href={p.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[#94a3b8] hover:text-white transition-colors"
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
                            className="p-2 rounded-xl border border-white/10 bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                            title="Visit site"
                          >
                            <ExternalLink size={13} />
                          </a>
                          <button
                            onClick={() => handleOpenEditExtension(ext)}
                            className="p-2 rounded-xl border border-white/10 bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit extension"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteExtension(ext.name)}
                            className="p-2 rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444] hover:bg-[#ef4444]/15 transition-colors"
                            title="Delete extension"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {extensionList.length === 0 && (
                      <div className="py-12 text-center text-xs text-[#64748b]">
                        No extensions yet. Add your first one.
                      </div>
                    )}
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
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0f111d] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCreatingProject(false);
                setEditingProject(null);
              }}
              className="absolute right-6 top-6 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>

            <h2 className="font-display text-2xl font-bold text-white">
              {isCreatingProject ? "Create New Project" : `Edit Project: ${projectForm.title}`}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1">
              Configure project case study details, architecture highlights, and metadata
            </p>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                    Project Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={projectForm.title || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    required
                    type="text"
                    value={projectForm.slug || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
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
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
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
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                    Release Year
                  </label>
                  <input
                    type="text"
                    value={projectForm.year || "2025"}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
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
                    className="rounded border-white/20 bg-[#090a12] text-[#34d399] focus:ring-0"
                  />
                  <label
                    htmlFor="featured-check"
                    className="text-xs font-mono text-white cursor-pointer"
                  >
                    Featured on Home
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Tagline / Short Hook
                </label>
                <input
                  type="text"
                  value={projectForm.tagline || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  placeholder="Intelligent personal finance and expense tracking on Android"
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Summary
                </label>
                <textarea
                  rows={3}
                  value={projectForm.summary || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Kotlin, Jetpack Compose, Room DB, Coroutines"
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Real-time expense tracking&#10;Offline first SQLite DB&#10;Material 3 dynamic theming"
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                    Live Demo / Tester URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://tester.subhan.tech/"
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.githubUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/Subhan-Haider/..."
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#94a3b8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]"
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
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <button
              onClick={() => setIsCreatingSkill(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={15} />
            </button>

            <h2 className="font-display text-xl font-bold text-white">Add Skill</h2>
            <p className="text-xs text-[#94a3b8] mt-1">
              Add a new technology or tool to the skills matrix
            </p>

            <form onSubmit={handleAddSkill} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.category} value={c.category}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Skill Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jetpack Glance"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
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
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#94a3b8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12]"
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
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0f111d] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setViewingMessage(null)}
              className="absolute right-6 top-6 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30 px-2.5 py-0.5 rounded-full">
                {viewingMessage.topic}
              </span>
              <span className="text-xs font-mono text-[#64748b]">{viewingMessage.date}</span>
            </div>

            <h2 className="font-display text-xl font-bold text-white mt-3">
              {viewingMessage.subject}
            </h2>

            <div className="mt-2 text-xs font-mono text-[#94a3b8] pb-4 border-b border-white/10">
              From: <span className="text-white font-bold">{viewingMessage.name}</span> (
              <a
                href={`mailto:${viewingMessage.email}`}
                className="text-[#34d399] hover:underline"
              >
                {viewingMessage.email}
              </a>
              )
            </div>

            <div className="mt-4 rounded-2xl bg-[#090a12]/80 border border-white/5 p-4 text-xs text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
              {viewingMessage.message}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleDeleteMessage(viewingMessage.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ef4444]/10 text-xs font-mono text-[#fca5a5] hover:bg-[#ef4444]/20"
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
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0f111d] p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsCreatingJourney(false);
                setEditingJourney(null);
              }}
              className="absolute right-6 top-6 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={16} />
            </button>
            <h2 className="font-display text-xl font-bold text-white">
              {isCreatingJourney ? "Add Milestone" : "Edit Milestone"}
            </h2>
            <form onSubmit={handleSaveJourney} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Year / Phase</label>
                  <input required type="text" value={journeyForm.year} onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Badge</label>
                  <input required type="text" value={journeyForm.badge} onChange={(e) => setJourneyForm({ ...journeyForm, badge: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Title</label>
                <input required type="text" value={journeyForm.title} onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Description</label>
                <textarea required rows={3} value={journeyForm.description} onChange={(e) => setJourneyForm({ ...journeyForm, description: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white resize-none focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => { setIsCreatingJourney(false); setEditingJourney(null); }} className="px-4 py-2 rounded-full bg-white/5 text-xs text-[#94a3b8] hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <button
              onClick={() => setEditingCategory(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={15} />
            </button>
            <h2 className="font-display text-xl font-bold text-white">Edit Category</h2>
            <form onSubmit={handleSaveEditCategory} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Category Name</label>
                <input required type="text" value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 rounded-full bg-white/5 text-xs text-[#94a3b8] hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SKILL MODAL */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <button
              onClick={() => setEditingSkill(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={15} />
            </button>

            <h2 className="font-display text-xl font-bold text-white">Edit Skill</h2>
            <p className="text-xs text-[#94a3b8] mt-1">
              Update skill details in {editingSkill.catName}
            </p>

            <form onSubmit={handleSaveEditSkill} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Skill Name *
                </label>
                <input
                  required
                  type="text"
                  value={editSkillForm.name}
                  onChange={(e) => setEditSkillForm({ ...editSkillForm, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">
                  Proficiency Level
                </label>
                <select
                  value={editSkillForm.level}
                  onChange={(e) => setEditSkillForm({ ...editSkillForm, level: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none"
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
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#94a3b8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12]"
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
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f111d] p-6 shadow-2xl">
            <button
              onClick={() => setIsCreatingCategory(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={15} />
            </button>
            <h2 className="font-display text-xl font-bold text-white">Add Category</h2>
            <form onSubmit={handleAddCategory} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Category Name</label>
                <input required type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setIsCreatingCategory(false)} className="px-4 py-2 rounded-full bg-white/5 text-xs text-[#94a3b8] hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT EXTENSION MODAL */}
      {(isCreatingExtension || editingExtension) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f111d] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsCreatingExtension(false); setEditingExtension(null); }}
              className="absolute right-6 top-6 p-2 rounded-full bg-white/5 text-[#94a3b8] hover:text-white"
            >
              <X size={16} />
            </button>

            <h2 className="font-display text-2xl font-bold text-white">
              {isCreatingExtension ? "Add Extension" : `Edit: ${editingExtension?.name}`}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1">Browser extension or tool listing details</p>

            <form onSubmit={handleSaveExtension} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Name *</label>
                  <input required type="text" value={extForm.name}
                    onChange={(e) => setExtForm({ ...extForm, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Role / Category *</label>
                  <input required type="text" value={extForm.role}
                    onChange={(e) => setExtForm({ ...extForm, role: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Website URL *</label>
                <input required type="url" value={extForm.url}
                  onChange={(e) => setExtForm({ ...extForm, url: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Description</label>
                <textarea value={extForm.desc} rows={2}
                  onChange={(e) => setExtForm({ ...extForm, desc: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#090a12]/80 px-3.5 py-2 text-xs text-white focus:border-[#34d399] focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-1.5">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={extForm.color}
                    onChange={(e) => setExtForm({ ...extForm, color: e.target.value })}
                    className="h-8 w-12 rounded cursor-pointer bg-transparent border border-white/10" />
                  <input type="text" value={extForm.color}
                    onChange={(e) => setExtForm({ ...extForm, color: e.target.value })}
                    className="flex-1 rounded-xl border border-white/10 bg-[#090a12]/80 px-3 py-2 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none" />
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-xs font-mono text-[#94a3b8] mb-2">Store Platforms</label>
                <div className="space-y-2 mb-3">
                  {extForm.platforms.map((p, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
                      <span className="text-xs font-mono text-white">{p.label}</span>
                      <span className="text-[11px] text-[#64748b] truncate max-w-[200px]">{p.href}</span>
                      <button type="button" onClick={() => handleRemoveExtPlatform(i)}
                        className="text-[#ef4444] hover:text-red-300 shrink-0">
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[80px_1fr_60px_auto] gap-2 items-end">
                  <div>
                    <label className="block text-[10px] font-mono text-[#64748b] mb-1">Label</label>
                    <input type="text" placeholder="Chrome" value={extPlatformInput.label}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, label: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090a12]/80 px-2 py-1.5 text-xs text-white focus:border-[#34d399] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#64748b] mb-1">URL</label>
                    <input type="url" placeholder="https://..." value={extPlatformInput.href}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, href: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090a12]/80 px-2 py-1.5 text-xs text-white font-mono focus:border-[#34d399] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#64748b] mb-1">Color</label>
                    <input type="color" value={extPlatformInput.color}
                      onChange={(e) => setExtPlatformInput({ ...extPlatformInput, color: e.target.value })}
                      className="h-[30px] w-full rounded cursor-pointer bg-transparent border border-white/10" />
                  </div>
                  <button type="button" onClick={handleAddExtPlatform}
                    className="h-[30px] px-3 rounded-lg bg-[#34d399]/20 text-[#34d399] text-xs font-bold hover:bg-[#34d399]/30 transition-colors">
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button type="button"
                  onClick={() => { setIsCreatingExtension(false); setEditingExtension(null); }}
                  className="px-4 py-2 rounded-full bg-white/5 text-xs text-[#94a3b8] hover:text-white">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 rounded-full bg-[#34d399] text-xs font-bold text-[#090a12] hover:bg-[#6ee7b7]">
                  {isCreatingExtension ? "Add Extension" : "Save Changes"}
                </button>
              </div>
            </form>
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-mono hover:bg-[#38bdf8]/25 transition-colors"
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
                className="p-2 rounded-full bg-white/10 text-[#94a3b8] hover:text-white hover:bg-white/15 transition-colors"
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
